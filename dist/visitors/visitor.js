"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var typescript_1 = __importDefault(require("typescript"));
var imports = __importStar(require("./imports"));
var diag = __importStar(require("../diagnostics"));
var statements = __importStar(require("./statements"));
var visitor = /** @class */ (function () {
    function visitor(printer, checker) {
        var _this = this;
        this.visit = function (node) {
            console.log(_this.checker.getTypeAtLocation);
            visit(node, _this);
        };
        console.log(checker.getTypeAtLocation);
        this.printer = printer;
        this.checker = checker;
        this.tasks = [];
    }
    return visitor;
}());
exports.visitor = visitor;
var visit = function (node, v) {
    if (node.kind == typescript_1["default"].SyntaxKind.EndOfFileToken) {
        return;
    }
    if (imports.handleImport(node)) {
        return;
    }
    if (typescript_1["default"].isClassDeclaration(node)) {
        return statements.visitClassDeclaration(node, v);
    }
    if (statements.isStatement(node)) {
        return statements.visitStatement(node, v);
    }
    if (typescript_1["default"].isFunctionDeclaration(node)) {
        console.log("FunctionDeclaration: " + node.body);
        console.log();
        return;
    }
    //TODO: allow only constant task declaration
    diag.emitDiagnostic(node, "visit: don't know how to handle " + typescript_1["default"].SyntaxKind[node.kind]);
    process.exit(1);
};
//# sourceMappingURL=visitor.js.map