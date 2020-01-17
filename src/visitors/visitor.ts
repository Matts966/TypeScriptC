import ts from 'typescript'
import * as imports from './imports'
import * as diag from '../diagnostics'
import * as statements from './statements'
import * as p from '../printer'
import * as util from '../utilities'

export class visitor {
    printer : p.Printer
    checker : ts.TypeChecker
    tasks : ts.MethodDeclaration[]
    taskNames : string[]
    useMessageBox : boolean[]
    nowProcessingTaskIndex : number
    private includes : string[]

    constructor(printer : p.Printer, checker : ts.TypeChecker) {
        this.printer = printer
        this.checker = checker
        this.tasks = []
        this.taskNames = []
        this.useMessageBox = []
        this.includes = []
        this.nowProcessingTaskIndex = 0
    }

    visit = (node : ts.Node) => {
        if (node.kind == ts.SyntaxKind.EndOfFileToken) {
            return
        }
        if (ts.isImportDeclaration(node)) {
            this.includes = this.includes.concat(imports.importsToIncludes(node))
            return
        }
        if (ts.isClassDeclaration(node)) {
            return statements.visitClassDeclaration(node, this)
        }
        if (statements.isStatement(node)) {
            return statements.visitStatement(node, this)
        }
        if (ts.isFunctionDeclaration(node)) {
            console.log("FunctionDeclaration: " + node.body)
            console.log()
            return
        }
        //TODO: allow only constant task declaration
        diag.emitDiagnostic(node, "visit: don't know how to handle " + ts.SyntaxKind[node.kind])
        process.exit(1)
    }

    visitProgram = (program : ts.Program) => {
        for (const sourceFile of program.getSourceFiles()) {
            if (!sourceFile.isDeclarationFile &&
                !sourceFile.fileName.endsWith("tkernel.ts") &&
                !sourceFile.fileName.endsWith("mqtt.ts")) {
                // using checker sample
                const symbol = this.checker.getSymbolAtLocation(sourceFile)
                // no program
                if (!symbol) process.exit(0)
                // Walk the tree to search source code.
                ts.forEachChild(sourceFile, this.visit)
            }
        }
    }

    printTasks = () => {
        if (this.tasks.length == 0) {
            return
        }

        let tmpPrinter = this.printer

        this.printer = new p.StdOutPrinter

        this.taskNames = this.tasks.map((m) => {
            return util.getTypeString(m.parent, this.checker)
        })

        this.printer.printLn("typedef enum { "
            + this.taskNames.map((name, index) =>
                name.toUpperCase() + ", "
                + (this.useMessageBox[index] ? "MBUF_" + name.toUpperCase() + ", " : "")
            ).join('')
            + "OBJ_KIND_NUM } OBJ_KIND;")

        this.printer.printLn("EXPORT ID ObjID[OBJ_KIND_NUM];")
        this.printer.printLn("")
        this.tasks.forEach((m, index) => {
            this.nowProcessingTaskIndex = index

            // Define buffer for the message buffer
            if (this.useMessageBox[index]) {
                this.printer.printLn("UB __" + this.taskNames[index] + "_buffer;")
            }

            const taskSig = "EXPORT void " + util.getTypeString(m.parent, this.checker) + "(INT stacd, VP exinf)"
            this.printer.printLn(taskSig + ';')
            this.printer.print(taskSig + " ")
            if (!m.body) {
                diag.emitDiagnostic(m, "no task body!")
                process.exit(1)
            }

            // Add tk_ext_tsk to the end of task
            // This code looks redundant becase the ts compiler api crashes when some conditions are not fulfilled
            let ident = ts.createIdentifier("tk_ext_tsk")
            ident.pos = m.body!.statements.end
            ident.end = ident.pos + 11
            let call = ts.createCall(ident, [], [])
            ident.parent = call
            let exprSt = ts.createExpressionStatement(call)
            call.parent = exprSt
            let nArr = ts.createNodeArray([...m.body!.statements, exprSt])
            exprSt.parent = m.body!
            m.body!.statements = nArr
            this.visit(m.body!)
            this.printer.printLn("")
        })

        this.printer = tmpPrinter
    }

    printIncludes = () => {
        if (this.includes.length == 0) {
            return
        }

        let tmpPrinter = this.printer

        this.printer = new p.StdOutPrinter

        this.includes.forEach((include) => {
            this.printer.printLn(include)
        })
        this.printer.printLn("")

        this.printer = tmpPrinter
    }
}
