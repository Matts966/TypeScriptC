import ts from 'typescript'

export const emitDiagnostics = (diagnostics : ts.Diagnostic[]) => {
    const diagHost : ts.FormatDiagnosticsHost = {
        getCanonicalFileName(f) { return f; },
        getCurrentDirectory() { return "."; },
        getNewLine() { return "\n"; }
    }
    console.log(ts.formatDiagnosticsWithColorAndContext(diagnostics, diagHost))
}
export class Diagnostic implements ts.Diagnostic {
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
export const emitDiagnostic = (node : ts.Node, messageText : string) => {
    emitDiagnostics([new Diagnostic(ts.DiagnosticCategory.Error, node.getSourceFile(), node.getStart(), node.getWidth(), messageText)])
    process.exit(1)
}
export const getDiagnostic = (node : ts.Node, messageText : string) => {
    return new Diagnostic(ts.DiagnosticCategory.Error, node.getSourceFile(), node.getStart(), node.getWidth(), messageText)
}
