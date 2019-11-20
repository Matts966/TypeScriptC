
import ts from 'typescript'
import * as c from './c'
import * as util from './utilities'
import * as diag from './diagnostics'
import * as visitors from './visitors'
import * as p from './printer'

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

let printer : p.Printer = new p.BufferedPrinter()

const printTasks = (v : visitors.visitor) => {
    if (v.tasks.length == 0) {
        return
    }

    const tmpPrinter = printer
    printer = new p.StdOutPrinter
    const taskNames = v.tasks.map((m) => {
        return util.getTypeString(m.parent, v.checker)
    })

    printer.printLn("typedef enum { " + taskNames.map((name) => name.toUpperCase() + ", ").join('') + "OBJ_KIND_NUM } OBJ_KIND;")
    printer.printLn("EXPORT ID ObjID[OBJ_KIND_NUM];")
    printer.printLn("")
    v.tasks.forEach((m) => {
        const taskSig = "EXPORT void " + util.getTypeString(m.parent, v.checker) + "(INT stacd, VP exinf)"
        printer.printLn(taskSig + ';')
        printer.print(taskSig + " ")
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
        v.visit(m.body!)
        printer.printLn("")
    })
    printer = tmpPrinter
}

export const main = () => {
    // For future use
    const cnp = new c.Program()
    cnp.includes.push()

    // Apply type check
    let allDiagnostics = ts.getPreEmitDiagnostics(program)
        .concat()
    if (allDiagnostics.length > 0) {
        diag.emitDiagnostics(allDiagnostics)
        process.exit(1)
    }

    console.log(`#include <tk/tkernel.h>
#include <tm/tmonitor.h>
#include <libstr.h>
`)

    const visitor = new visitors.visitor(new p.BufferedPrinter(), checker)

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
            ts.forEachChild(sourceFile, visitor.visit)
        }
    }

    printTasks(visitor)

    console.log(`EXPORT INT usermain( void ) {`)
    if (visitor.tasks.length != 0) {
        console.log(`\tT_CTSK t_ctsk;
\tID objid;
\tt_ctsk.tskatr = TA_HLNG | TA_DSNAME;
`);
    }

    (printer as p.BufferedPrinter).outputBuffer()

    console.log(`}`)
}

main()
