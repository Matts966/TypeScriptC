import ts from 'typescript'
import * as imports from './imports'
import * as diag from '../diagnostics'
import * as statements from './statements'
import * as printer from '../printer'

export class visitor {
    printer : printer.Printer
    checker : ts.TypeChecker
    tasks : ts.MethodDeclaration[]

    constructor(printer : printer.Printer, checker : ts.TypeChecker) {
        console.log(checker.getTypeAtLocation)
        this.printer = printer
        this.checker = checker
        this.tasks = []
    }

    visit = (node : ts.Node) => {
        console.log(this.checker.getTypeAtLocation)
        visit(node, this)
    }
}

let visit = (node : ts.Node, v : visitor) => {
    if (node.kind == ts.SyntaxKind.EndOfFileToken) {
        return
    }
    if (imports.handleImport(node)) {
        return
    }
    if (ts.isClassDeclaration(node)) {
        return statements.visitClassDeclaration(node, v)
    }
    if (statements.isStatement(node)) {
        return statements.visitStatement(node, v)
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
