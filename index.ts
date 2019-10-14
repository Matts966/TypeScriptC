import * as ts from 'typescript'

let fileNames = process.argv.slice(2)
let program = ts.createProgram(fileNames, {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS
})

let checker = program.getTypeChecker()

let emitDiagnostics = (diagnostics: ts.Diagnostic[]) => {
    const diagHost: ts.FormatDiagnosticsHost = {
        getCanonicalFileName(f) { return f; },
        getCurrentDirectory() { return "."; },
        getNewLine() { return "\r\n"; }
    }
    console.log(ts.formatDiagnosticsWithColorAndContext(diagnostics, diagHost))
}

enum IndentType{ tab = ' ', space = '   ' }
interface Printer {
    indentLevel: Number,
    indentType: IndentType,
    withNewLine: Boolean
    print: (s: string) => void
}
const printer: Printer = {
    indentLevel: 1,
    indentType: IndentType.tab,
    withNewLine: false,
    print: (s: string) => {
        if (this.indentLevel > 0) {
            s = this.indentType.repeat(this.indentLevel) + s
        }
        if (this.withNewLine) {
            console.log(s)
        } else {
            process.stdout.write(s)
        }
    }
}

var tKernelImported = false
let isImportTKernel = (i: ts.ImportDeclaration) => {
    let namedImport = i.importClause.namedBindings as ts.NamespaceImport
    if (namedImport.name.text != "tkernel") {
        return false
    }
    tKernelImported = true
    return true
}
let handleImport = (node: ts.Node) => {
    if (ts.isImportDeclaration(node)) {
        if (!isImportTKernel(node)) {
            console.log('please import only tkernel by `import * as tkernel from "./tkernel"`')
            process.exit(1)
        }
        return true
    }
    if (!tKernelImported) {
        console.log('please import tkernel by `import * as tkernel from "./tkernel"`')
        process.exit(1)
    }
}

let visitExpression = (expression: ts.Expression) => {
    if (ts.isCallExpression(expression)) {
        if (expression.expression.getText() == "console.log") {
            process.stdout.write("tm_putstring(\"" + expression.arguments.map((e) => {
                if (ts.isLiteralExpression(e))
                    return e.text
                else process.exit(1)
            }) + "\")")
            return
        }

        for (const node of expression.arguments) {
            process.stdout.write(checker.typeToString(checker.getTypeAtLocation(node)) + " ")
        }

        console.log(")")

        return
    }
    process.stdout.write(expression.getText())
}

let isStatement = (node: ts.Node): node is ts.Statement => {
    if (ts.isExpressionStatement(node) || ts.isIfStatement(node) || ts.isWhileStatement || ts.isVariableStatement || ts.isReturnStatement) {
        return true
    }
}

let visitExpressionStatement = (expressionStatement: ts.ExpressionStatement) => {
    visitExpression(expressionStatement.expression)
    console.log()
}

let visitStatement = (statement: ts.Statement) => {
    if (ts.isExpressionStatement(statement)) {
        visitExpressionStatement(statement)
        console.log()
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
        console.log()
        return
    }
    console.error("don't know how to handle", ts.SyntaxKind[statement.kind])
    process.exit(1)
}

let visitVariableStatement = (variableStatement: ts.VariableStatement) => {
    process.stdout.write(variableStatement.getText())
}

let visit = (node: ts.Node) => {
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
    console.error("don't know how to handle", ts.SyntaxKind[node.kind])
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

console.log(`EXPORT	INT	usermain( void ) {
	T_CTSK t_ctsk;
	ID objid;
    t_ctsk.tskatr = TA_HLNG | TA_DSNAME;
`)

for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile && !sourceFile.fileName.endsWith("tkernel.ts")) {
        // Walk the tree to search for classes
        ts.forEachChild(sourceFile, visit)
    }
}

console.log(`}
`)
