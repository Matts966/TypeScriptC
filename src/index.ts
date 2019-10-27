
import * as ts from 'typescript'
import { c } from './c'

namespace typescriptc {
    // Initial file settings
    let fileNames = process.argv.slice(2)
    let program = ts.createProgram(fileNames, {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        strict: true,
    })

    // Type Checker initialization
    let checker = program.getTypeChecker()

    // Diagnostics
    const emitDiagnostics = (diagnostics : ts.Diagnostic[]) => {
        const diagHost : ts.FormatDiagnosticsHost = {
            getCanonicalFileName(f) { return f; },
            getCurrentDirectory() { return "."; },
            getNewLine() { return "\n"; }
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
            this.code = 0
            this.file = file
            this.start = start
            this.length = length
            this.messageText = messageText
        }
    }
    const emitDiagnostic = (node : ts.Node, messageText : string) => {
        emitDiagnostics([new Diagnostic(ts.DiagnosticCategory.Error, node.getSourceFile(), node.getStart(), node.getWidth(), messageText)])
        process.exit(1)
    }

    // Printer
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
        private options : PrinterOptions = {
            indentLevel: 1,
            indentType: IndentType.tab,
            withNewLine: true,
        };
        print(s : string, p = this.options) {
            if (p.indentLevel && p.indentLevel > 0) {
                const t = p.indentType || IndentType.tab
                s = t.repeat(p.indentLevel) + s
            }
            if (p.withNewLine) {
                console.log(s)
            } else {
                process.stdout.write(s)
            }
        }
        indent() {
            ++this.options.indentLevel!
        }
        unindent() {
            --this.options.indentLevel!
        }
    }
    let printer = new StdOutPrinter()

    // Utility
    let isGlobal = (node : ts.Node) => {
        if (ts.isSourceFile(node.parent)) return true
        return false
    }

    // Import Statement
    let tKernelImported = false
    let isImportTKernel = (i : ts.ImportDeclaration) => {
        const ic = i.importClause
        if (!ic) return
        let namedImport = ic.namedBindings as ts.NamespaceImport
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

    // Expression
    let visitExpression = (expression : ts.Expression) => {
        if (ts.isCallExpression(expression)) {
            if (expression.expression.getText() == "console.log") {
                printer.print("tm_putstring(\"" + expression.arguments.map((e) => {
                    if (ts.isLiteralExpression(e))
                        return e.text
                    else process.exit(1)
                }) + "\\n\");", { withNewLine: false })
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

    // Statement
    let isStatement = (node : ts.Node) : node is ts.Statement => {
        if (ts.isExpressionStatement(node) || ts.isIfStatement(node) || ts.isWhileStatement(node) || ts.isVariableStatement(node) || ts.isReturnStatement(node) || ts.isBlock(node)) {
            return true
        }
        return false
    }
    let visitExpressionStatement = (expressionStatement : ts.ExpressionStatement) => {
        visitExpression(expressionStatement.expression)
        console.log()
    }
    let visitVariableStatement = (variableStatement : ts.VariableStatement) => {
        for (const d of variableStatement.declarationList.declarations) {
            const type = checker.getTypeAtLocation(d.type!) as ts.TypeReference;
            // const typeArg = type.typeArguments![0];
            console.log(type.getDefault())
        }
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
            printer.indent()
            statement.statements.forEach((e) => {
                visitStatement(e)
            })
            printer.unindent()
            printer.print("}")
            return
        }
        emitDiagnostic(statement, "visitStatement: don't know how to handle" + ts.SyntaxKind[statement.kind])
        process.exit(1)
    }

    let visitClassDeclaration = (classDeclaration : ts.ClassDeclaration) => {
        if (!isGlobal(classDeclaration)) emitDiagnostic(classDeclaration, "ClassDeclarations is only allowed in global scope")
        let notAllowedDiagnostic = () => emitDiagnostic(classDeclaration, "ClassDeclarations other than tasks are not allowed")
        const heritage = classDeclaration.heritageClauses
        if (!heritage || heritage.length != 1 && heritage[0].types.length != 1) {
            notAllowedDiagnostic()
            return
        }
        if (heritage[0].types[0].getText() != "tkernel.Task") {
            notAllowedDiagnostic()
            return
        }
        notAllowedDiagnostic = () => emitDiagnostic(classDeclaration, "Task Declaration should be only with task function")
        if (classDeclaration.members.length != 1) {
            notAllowedDiagnostic()
            return
        }
        const m = classDeclaration.members[0]
        if (!m || !m.name || m.name.getText() != "task") {
            notAllowedDiagnostic()
        }
        console.log(classDeclaration.members[0].getText())
    }

    // General visit function
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
        if (ts.isClassDeclaration(node)) {
            return visitClassDeclaration(node)
        }
        if (node.kind == ts.SyntaxKind.EndOfFileToken) {
            return
        }
        //TODO: allow only constant task declaration
        emitDiagnostic(node, "visit: don't know how to handle" + ts.SyntaxKind[node.kind])
        process.exit(1)
    }



    export const main = () => {
        const cnp = new c.Program()
        cnp.includes.push()

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

        // Main loop
        for (const sourceFile of program.getSourceFiles()) {
            if (!sourceFile.isDeclarationFile && !sourceFile.fileName.endsWith("tkernel.ts")) {

                // using checker sample
                const symbol = checker.getSymbolAtLocation(sourceFile)!
                const src = symbol.valueDeclaration
                if (ts.isSourceFile(src)) {
                    for (const node of src.statements) {
                        // TODO: handle declarations for later use
                        if (ts.isClassDeclaration(node)) {

                        }
                        if (ts.isVariableStatement(node)) {

                        }
                    }
                }

                // Walk the tree to search source code.
                ts.forEachChild(sourceFile, visit)
            }
        }

        console.log(`}
`)
    }
}

typescriptc.main()
