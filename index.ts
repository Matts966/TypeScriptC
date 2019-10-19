import * as ts from 'typescript'

let fileNames = process.argv.slice(2)
let program = ts.createProgram(fileNames, {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS
})

let checker = program.getTypeChecker()

let emitDiagnostics = (diagnostics : ts.Diagnostic[]) => {
    const diagHost : ts.FormatDiagnosticsHost = {
        getCanonicalFileName(f) { return f; },
        getCurrentDirectory() { return "."; },
        getNewLine() { return "\r\n"; }
    }
    console.log(ts.formatDiagnosticsWithColorAndContext(diagnostics, diagHost))
}

class Diagnostic implements ts.Diagnostic {
    category : ts.DiagnosticCategory
    code : number
    file : ts.SourceFile | undefined
    start : number | undefined
    length : number | undefined
    messageText : string | ts.DiagnosticMessageChain
    constructor(category : ts.DiagnosticCategory, file : ts.SourceFile, start : number, length : number, messageText : string) {
        this.category = category
        this.file = file
        this.start = start
        this.length = length
        this.messageText = messageText
    }
}
let emitDiagnostic = (node : ts.Node, messageText : string) => {
    emitDiagnostics([new Diagnostic(ts.DiagnosticCategory.Error, node.getSourceFile(), node.getStart(), node.getWidth(), messageText)])
    process.exit(1)
}

enum IndentType { tab = '\t', space = '\s' }
type PrinterOptions = {
    indentLevel?: number,
    indentType?: IndentType,
    withNewLine?: boolean,
}
interface Printer {
    print : (s : string, p?: PrinterOptions) => void
}
class StdOutPrinter implements Printer {
    options : PrinterOptions = {
        indentLevel: 1,
        indentType: IndentType.tab,
        withNewLine: true,
    };
    print(s : string, p = this.options) {
        if (p.indentLevel > 0) {
            s = p.indentType.repeat(p.indentLevel) + s
        }
        if (p.withNewLine) {
            console.log(s)
        } else {
            process.stdout.write(s)
        }
    }
}
let printer = new StdOutPrinter()

var tKernelImported = false
let isImportTKernel = (i : ts.ImportDeclaration) => {
    let namedImport = i.importClause.namedBindings as ts.NamespaceImport
    if (namedImport.name.text != "tkernel") {
        return false
    }
    tKernelImported = true
    return true
}
let handleImport = (node : ts.Node) => {
    if (ts.isImportDeclaration(node)) {
        if (!isImportTKernel(node)) {
            emitDiagnostic(node, 'please import only tkernel by `import * as tkernel from "./tkernel"`')
            process.exit(1)
        }
        return true
    }
    if (!tKernelImported) {
        emitDiagnostic(node, 'please import only tkernel by `import * as tkernel from "./tkernel"`')
        process.exit(1)
    }
}

let visitExpression = (expression : ts.Expression) => {
    if (ts.isCallExpression(expression)) {
        if (expression.expression.getText() == "console.log") {
            printer.options.withNewLine = false
            printer.print("tm_putstring(\"" + expression.arguments.map((e) => {
                if (ts.isLiteralExpression(e))
                    return e.text
                else process.exit(1)
            }) + "\")")
            printer.options.withNewLine = true
            return
        }

        for (const node of expression.arguments) {
            process.stdout.write(checker.typeToString(checker.getTypeAtLocation(node)) + " ")
        }

        console.log(");")

        return
    }
    process.stdout.write(expression.getText())
}

let isStatement = (node : ts.Node) : node is ts.Statement => {
    if (ts.isExpressionStatement(node) || ts.isIfStatement(node) || ts.isWhileStatement(node) || ts.isVariableStatement(node) || ts.isReturnStatement(node) || ts.isBlock(node)) {
        return true
    }
}
let visitExpressionStatement = (expressionStatement : ts.ExpressionStatement) => {
    visitExpression(expressionStatement.expression)
    console.log()
}
let visitVariableStatement = (variableStatement : ts.VariableStatement) => {
    process.stdout.write(variableStatement.getText())
}
let visitStatement = (statement : ts.Statement) => {
    if (ts.isExpressionStatement(statement)) {
        visitExpressionStatement(statement)
        return
    }
    if (ts.isVariableStatement(statement)) {
        console.log("VariableStatement: ")
        visitVariableStatement(statement)
        console.log()
        return
    }
    if (ts.isIfStatement(statement)) {
        process.stdout.write("if (")
        visitExpression(statement.expression)
        process.stdout.write(") ")
        visitStatement(statement.thenStatement)
        if (statement.elseStatement) {
            visitStatement(statement.elseStatement)
        }
        console.log()
        return
    }
    if (ts.isWhileStatement(statement)) {
        process.stdout.write("while (")
        visitExpression(statement.expression)
        process.stdout.write(") ")
        visitStatement(statement.statement)
        return
    }
    if (ts.isBlock(statement)) {
        printer.print("{", { indentLevel: 0 })
        printer.options.indentLevel += 1
        statement.statements.forEach((e) => {
            visitStatement(e)
        })
        printer.options.indentLevel -= 1
        printer.print("}")
        return
    }
    emitDiagnostic(statement, "visitStatement: don't know how to handle" + ts.SyntaxKind[statement.kind])
    process.exit(1)
}

let visit = (node : ts.Node) => {
    if (handleImport(node)) return
    if (isStatement(node)) {
        return visitStatement(node)
    }
    if (ts.isFunctionDeclaration(node)) {
        console.log("FunctionDeclaration: " + node.body)
        console.log()
        return
    }
    if (node.kind == ts.SyntaxKind.EndOfFileToken) {
        return
    }
    emitDiagnostic(node, "visit: don't know how to handle" + ts.SyntaxKind[node.kind])
    process.exit(1)
}

// Apply type check
let allDiagnostics = ts.getPreEmitDiagnostics(program)
    .concat()
if (allDiagnostics.length > 0) {
    emitDiagnostics(allDiagnostics)
    process.exit(1)
}

console.log(`#include <tk/tkernel.h>
#include <tm/tmonitor.h>
#include <libstr.h>
`)

console.log(`EXPORT INT usermain( void ) {
\tT_CTSK t_ctsk;
\tID objid;
\tt_ctsk.tskatr = TA_HLNG | TA_DSNAME;
`)

for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile && !sourceFile.fileName.endsWith("tkernel.ts")) {
        // Walk the tree to search for classes
        ts.forEachChild(sourceFile, visit)
    }
}

console.log(`}
`)
