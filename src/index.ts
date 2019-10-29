
import * as ts from 'typescript'
import { c } from './c'

namespace typescriptc {
    // Initial file settings
    let fileNames = process.argv.slice(2)
    let program = ts.createProgram(fileNames, {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        strict: true,
        strictNullChecks: true,
        noImplicitAny: true,
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
    const getDiagnostic = (node : ts.Node, messageText : string) => {
        return new Diagnostic(ts.DiagnosticCategory.Error, node.getSourceFile(), node.getStart(), node.getWidth(), messageText)
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
            withNewLine: false,
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
            return this
        }
        printLn(s : string, p = this.options) {
            const opt = { ...this.options }
            this.options = p
            this.options.withNewLine = true
            this.print(s, this.options)
            this.options = opt
            return this
        }
        printWithoutSpace(s : string) {
            process.stdout.write(s)
        }
        indent() {
            ++this.options.indentLevel!
            return this
        }
        unindent() {
            --this.options.indentLevel!
            return this
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

    // Camel to snake
    const camelToSnake = (s : string, big : boolean = false) => {
        s = s.slice(0, 1).toLowerCase() + s.slice(1)
        const snake = s.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        if (big) {
            return snake.toUpperCase()
        }
        return snake
    }

    // Expression
    let visitExpression = (expression : ts.Expression) => {
        if (expression.getText() == "true") {
            printer.printWithoutSpace("1")
            return
        }
        if (ts.isNumericLiteral(expression)) {
            printer.printWithoutSpace(expression.text)
            return
        }
        if (ts.isCallExpression(expression)) {
            switch (expression.expression.getText()) {
                case "console.log":
                    printer.print("tm_putstring(\"" + expression.arguments.map((e) => {
                        if (ts.isLiteralExpression(e))
                            return e.text
                        else process.exit(1)
                    }) + "\\n\");")
                    return
                case "process.exit":
                    printer.print("return " + expression.arguments[0].getText() + ";")
                    return
                // TODO: handle arguements
                default:
                    if (ts.isPropertyAccessExpression(expression.expression)) {
                        // TODO: add util for type checker
                        const type = checker.getTypeAtLocation(expression.expression.expression)
                        if (checker.typeToString(type.getBaseTypes()![0]) == "Task") {
                            if (expression.expression.name.getText() == "start") {
                                const typeName = checker.typeToString(type)
                                printer.print("tk_sta_tsk( ObjID[" + camelToSnake(typeName, true) + "], ")
                                let argNum = 0
                                for (const arg of expression.arguments) {
                                    if (argNum != 0) {
                                        emitDiagnostic(expression, "invalid argument in task.start")
                                        process.exit(1)
                                    }
                                    visitExpression(arg)
                                    ++argNum
                                }
                                printer.printWithoutSpace(" );")
                            } else {
                                emitDiagnostic(expression, "don't know how to handle " + expression.expression.name.getText())
                                process.exit(1)
                            }
                        } else {
                            emitDiagnostic(expression, "don't know how to handle " + checker.typeToString(type))
                            process.exit(1)
                        }
                        return
                    }
                    printer.print(expression.expression.getText() + "();")
            }

            // TODO: Add type map
            // for (const arg of expression.arguments) {
            //     process.stdout.write(checker.typeToString(checker.getTypeAtLocation(node)) + " ")
            //     printer.print(arg.getText(), { indentLevel: 0 })
            //     console.log(arg.getText())
            // }
            // printer.printLn(");")

            return
        }
        process.stdout.write(expression.getText())
    }

    // Statement
    let isStatement = (node : ts.Node) : node is ts.Statement => {
        if (ts.isExpressionStatement(node) || ts.isIfStatement(node) || ts.isWhileStatement(node) || ts.isForStatement || ts.isVariableStatement(node) || ts.isReturnStatement(node) || ts.isBlock(node)) {
            return true
        }
        return false
    }
    let visitExpressionStatement = (expressionStatement : ts.ExpressionStatement) => {
        visitExpression(expressionStatement.expression)
        console.log()
    }
    let visitVariableStatement = (variableStatement : ts.VariableStatement) => {
        visitVariableDeclarationList(variableStatement.declarationList)
    }
    const visitVariableDeclarationList = (variableDeclarationList : ts.VariableDeclarationList) => {
        for (const d of variableDeclarationList.declarations) {
            if (!d.initializer) {
                emitDiagnostic(d, "lack of initialization")
                process.exit(1)
            }

            const expr = d.initializer!
            if (ts.isNewExpression(expr)) {
                if (ts.isClassExpression(expr.expression)) {
                    const sym = checker.getSymbolAtLocation(expr.expression.name!)
                    const type = checker.getDeclaredTypeOfSymbol(sym!)
                    // console.log(checker.typeToString(type))
                    // console.log(type.isClass())
                    const onlyTaskAllowedMessage = "classes that extends only Task are allowed"
                    const baseTypes = type.getBaseTypes()
                    if (!baseTypes || baseTypes.length != 1) {
                        emitDiagnostic(d, onlyTaskAllowedMessage)
                        process.exit(1)
                    }
                    if (checker.typeToString(baseTypes![0]) != "Task") {
                        emitDiagnostic(d, onlyTaskAllowedMessage)
                        process.exit(1)
                    }
                    if (!expr.arguments) {
                        printer.printLn("t_ctsk.stksz = 1024;")
                        printer.printLn("t_ctsk.itskpri = 1;")
                    } else {
                        let argNum = 0
                        for (const arg of expr.arguments) {
                            if (argNum == 0) {
                                printer.print("t_ctsk.itskpri = ")
                                visitExpression(arg)
                                printer.printLn(";")
                            } else if (argNum == 1) {
                                printer.print("t_ctsk.stksz = ")
                                visitExpression(arg)
                                printer.printLn(";")
                            } else {
                                emitDiagnostic(expr.expression, "invalid arguments")
                                process.exit(1)
                            }
                            ++argNum
                        }
                        if (argNum == 0) {
                            printer.printLn("t_ctsk.stksz = 1024;")
                            printer.printLn("t_ctsk.itskpri = 1;")
                        }
                        if (argNum == 1) {
                            printer.printLn("t_ctsk.stksz = 1024;")
                        }
                    }
                    const taskIdent = expr.expression.name
                    if (!taskIdent) {
                        emitDiagnostic(expr.expression, "invalid task")
                        process.exit(1)
                    }
                    const taskName = camelToSnake(taskIdent!.text)
                    printer.printLn("STRCPY( (char *)t_ctsk.dsname, \"" + taskName + "\");")
                    printer.printLn("t_ctsk.task = " + taskName + ";")
                    printer.printLn("if ( (objid = tk_cre_tsk( &t_ctsk )) <= E_OK ) {")
                    printer.indent().printLn("tm_putstring(\" *** Failed in the creation of " + taskName + ".\\n\");")
                    printer.printLn("return 1;")
                    printer.unindent().printLn("}")
                    printer.printLn("ObjID[" + taskName.toUpperCase() + "] = objid;")
                    continue
                }
            }

            emitDiagnostic(d, "don't know how to handle this initializer " + d.initializer)
            process.exit(1)

            // const sym = checker.getSymbolAtLocation(d.name)
            // const type = checker.getDeclaredTypeOfSymbol(sym!)
            // console.log(checker.typeToString(type))

            // const sym = checker.getSymbolAtLocation(d)
            // const type = checker.getDeclaredTypeOfSymbol(sym!)

            // const type = checker.getTypeAtLocation(d) as ts.TypeReference;
            // const typeArg = type.typeArguments![0];
        }
    }
    let visitStatement = (statement : ts.Statement) => {
        if (ts.isExpressionStatement(statement)) {
            visitExpressionStatement(statement)
            return
        }
        if (ts.isVariableStatement(statement)) {
            visitVariableStatement(statement)
            return
        }
        if (ts.isIfStatement(statement)) {
            printer.print("if (")
            visitExpression(statement.expression)
            printer.printWithoutSpace(") ")
            visitStatement(statement.thenStatement)
            // TODO: handle else if
            if (statement.elseStatement) {
                printer.print(" else ")
                visitStatement(statement.elseStatement)
            }
            return
        }
        if (ts.isWhileStatement(statement)) {
            printer.print("while(")
            visitExpression(statement.expression)
            printer.printWithoutSpace(") ")
            visitStatement(statement.statement)
            return
        }
        if (ts.isForStatement(statement)) {
            printer.print("for (")
            const ini = statement.initializer
            if (ini) {
                if (ts.isVariableDeclarationList(ini)) {
                    visitVariableDeclarationList(ini)
                } else {
                    visitExpression(ini)
                }
            }
            printer.print("; ")
            const cond = statement.condition
            if (cond) {
                visitExpression(cond)
            }
            printer.print("; ")
            const incre = statement.incrementor
            if (incre) {
                visitExpression(incre)
            }
            printer.printWithoutSpace(") ")
            visitStatement(statement.statement)
        }
        if (ts.isBlock(statement)) {
            printer.printLn("{", { indentLevel: 0 })
            printer.indent()
            statement.statements.forEach((e) => {
                visitStatement(e)
            })
            printer.unindent()
            printer.printLn("}")
            return
        }
        emitDiagnostic(statement, "visitStatement: don't know how to handle " + ts.SyntaxKind[statement.kind])
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
        if (node.kind == ts.SyntaxKind.EndOfFileToken) {
            return
        }
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
        //TODO: allow only constant task declaration
        emitDiagnostic(node, "visit: don't know how to handle " + ts.SyntaxKind[node.kind])
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

        console.log(`}`)
    }
}

typescriptc.main()
