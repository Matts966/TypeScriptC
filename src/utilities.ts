import ts from 'typescript'

export const isGlobal = (node : ts.Node) => {
    if (ts.isSourceFile(node.parent)) return true
    return false
}

export const camelToSnake = (s : string, big : boolean = false) => {
    s = s.slice(0, 1).toLowerCase() + s.slice(1)
    const snake = s.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    if (big) {
        return snake.toUpperCase()
    }
    return snake
}

export const getTypeString = (node : ts.Node, checker : ts.TypeChecker) => {
    const type = checker.getTypeAtLocation(node)
    const typeName = checker.typeToString(type)
    const splited = typeName.split(" ")
    if (splited.length != 1) {
        return camelToSnake(splited[1])
    }
    return camelToSnake(typeName)
}

export const getProgramFromArgV = () => {
    let fileNames = process.argv.slice(2)
    return ts.createProgram(fileNames, {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        strict: true,
        strictNullChecks: true,
        noImplicitAny: true,
    })
}

export const getPreEmitDiagnostics = (p : ts.Program) => {
    return ts.getPreEmitDiagnostics(p)
}
