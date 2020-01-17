"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
exports.emitDiagnostics = (diagnostics) => {
    const diagHost = {
        getCanonicalFileName(f) { return f; },
        getCurrentDirectory() { return "."; },
        getNewLine() { return "\n"; }
    };
    console.log(typescript_1.default.formatDiagnosticsWithColorAndContext(diagnostics, diagHost));
};
class Diagnostic {
    constructor(category, file, start, length, messageText) {
        this.category = category;
        this.code = 0;
        this.file = file;
        this.start = start;
        this.length = length;
        this.messageText = messageText;
    }
}
exports.Diagnostic = Diagnostic;
exports.emitDiagnostic = (node, messageText) => {
    exports.emitDiagnostics([new Diagnostic(typescript_1.default.DiagnosticCategory.Error, node.getSourceFile(), node.getStart(), node.getWidth(), messageText)]);
};
exports.getDiagnostic = (node, messageText) => {
    return new Diagnostic(typescript_1.default.DiagnosticCategory.Error, node.getSourceFile(), node.getStart(), node.getWidth(), messageText);
};
//# sourceMappingURL=diagnostics.js.map