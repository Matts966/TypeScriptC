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

let visitExpressionStatement = (expressionStatement: ts.ExpressionStatement) => {
    visitExpression(expressionStatement.expression)
    console.log()
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

let visitStatement = (statement: ts.Statement) => {
    process.stdout.write(statement.getText())
}

let visitVariableStatement = (variableStatement: ts.VariableStatement) => {
    process.stdout.write(variableStatement.getText())
}

let visit = (node: ts.Node) => {
    if (handleImport(node)) return
    if (ts.isExpressionStatement(node)) {
        visitExpressionStatement(node as ts.ExpressionStatement)
        console.log()
        return
    }
    if (ts.isVariableStatement(node)) {
        console.log("VariableStatement: ")
        visitVariableStatement(node)
        console.log()
        return
    }
    if (ts.isIfStatement(node)) {
        process.stdout.write("if (")
        visitExpression(node.expression)
        process.stdout.write(") ")
        visitStatement(node.thenStatement)
        if (node.elseStatement) {
            visitStatement(node.elseStatement)
        }
        console.log()
        return
    }
    if (ts.isFunctionDeclaration(node)) {
        console.log("FunctionDeclaration: " + node.body)
        console.log()
        return
    }
    if (ts.isWhileStatement(node)) {
        process.stdout.write("while (")
        visitExpression(node.expression)
        process.stdout.write(") ")
        visitStatement(node.statement)
        console.log()
        return
    }
    if (node.kind == ts.SyntaxKind.EndOfFileToken) {
        process.exit(0)
    }
    console.log("don't know how to handle", ts.SyntaxKind[node.kind])
    process.exit(1)
}

// Apply type check
let allDiagnostics = ts.getPreEmitDiagnostics(program)
    .concat()
if (allDiagnostics.length > 0) {
    emitDiagnostics(allDiagnostics)
    process.exit(1)
}

for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile && !sourceFile.fileName.endsWith("tkernel.ts")) {
        // Walk the tree to search for classes
        ts.forEachChild(sourceFile, visit)
    }
}
