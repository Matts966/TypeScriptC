"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var typescript_1 = __importDefault(require("typescript"));
exports.emitDiagnostics = function (diagnostics) {
    var diagHost = {
        getCanonicalFileName: function (f) { return f; },
        getCurrentDirectory: function () { return "."; },
        getNewLine: function () { return "\n"; }
    };
    console.log(typescript_1["default"].formatDiagnosticsWithColorAndContext(diagnostics, diagHost));
};
var Diagnostic = /** @class */ (function () {
    function Diagnostic(category, file, start, length, messageText) {
        this.category = category;
        this.code = 0;
        this.file = file;
        this.start = start;
        this.length = length;
        this.messageText = messageText;
    }
    return Diagnostic;
}());
exports.Diagnostic = Diagnostic;
exports.emitDiagnostic = function (node, messageText) {
    exports.emitDiagnostics([new Diagnostic(typescript_1["default"].DiagnosticCategory.Error, node.getSourceFile(), node.getStart(), node.getWidth(), messageText)]);
    process.exit(1);
};
exports.getDiagnostic = function (node, messageText) {
    return new Diagnostic(typescript_1["default"].DiagnosticCategory.Error, node.getSourceFile(), node.getStart(), node.getWidth(), messageText);
};
//# sourceMappingURL=diagnostics.js.map