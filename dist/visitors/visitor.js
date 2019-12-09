"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
var p = __importStar(require("../printer"));
var util = __importStar(require("../utilities"));
var visitor = /** @class */ (function () {
    function visitor(printer, checker) {
        var _this = this;
        this.visit = function (node) {
            if (node.kind == typescript_1["default"].SyntaxKind.EndOfFileToken) {
                return;
            }
            if (imports.handleImport(node)) {
                _this.imports.push("tkernel");
                return;
            }
            if (typescript_1["default"].isClassDeclaration(node)) {
                return statements.visitClassDeclaration(node, _this);
            }
            if (statements.isStatement(node)) {
                return statements.visitStatement(node, _this);
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
        this.visitProgram = function (program) {
            for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
                var sourceFile = _a[_i];
                if (!sourceFile.isDeclarationFile && !sourceFile.fileName.endsWith("tkernel.ts")) {
                    // using checker sample
                    var symbol = _this.checker.getSymbolAtLocation(sourceFile);
                    var src = symbol.valueDeclaration;
                    if (typescript_1["default"].isSourceFile(src)) {
                        for (var _b = 0, _c = src.statements; _b < _c.length; _b++) {
                            var node = _c[_b];
                            // TODO: handle declarations for later use
                            if (typescript_1["default"].isClassDeclaration(node)) {
                            }
                            if (typescript_1["default"].isVariableStatement(node)) {
                            }
                        }
                    }
                    // Walk the tree to search source code.
                    typescript_1["default"].forEachChild(sourceFile, _this.visit);
                }
            }
        };
        this.printTasks = function () {
            if (_this.tasks.length == 0) {
                return;
            }
            var tmpPrinter = _this.printer;
            _this.printer = new p.StdOutPrinter;
            var taskNames = _this.tasks.map(function (m) {
                return util.getTypeString(m.parent, _this.checker);
            });
            _this.printer.printLn("typedef enum { " + taskNames.map(function (name) { return name.toUpperCase() + ", "; }).join('') + "OBJ_KIND_NUM } OBJ_KIND;");
            _this.printer.printLn("EXPORT ID ObjID[OBJ_KIND_NUM];");
            _this.printer.printLn("");
            _this.tasks.forEach(function (m) {
                var taskSig = "EXPORT void " + util.getTypeString(m.parent, _this.checker) + "(INT stacd, VP exinf)";
                _this.printer.printLn(taskSig + ';');
                _this.printer.print(taskSig + " ");
                if (!m.body) {
                    diag.emitDiagnostic(m, "no task body!");
                    process.exit(1);
                }
                // Add tk_ext_tsk to the end of task
                // This code looks redundant becase the ts compiler api crashes when some conditions are not fulfilled
                var ident = typescript_1["default"].createIdentifier("tk_ext_tsk");
                ident.pos = m.body.statements.end;
                ident.end = ident.pos + 11;
                var call = typescript_1["default"].createCall(ident, [], []);
                ident.parent = call;
                var exprSt = typescript_1["default"].createExpressionStatement(call);
                call.parent = exprSt;
                var nArr = typescript_1["default"].createNodeArray(__spreadArrays(m.body.statements, [exprSt]));
                exprSt.parent = m.body;
                m.body.statements = nArr;
                _this.visit(m.body);
                _this.printer.printLn("");
            });
            _this.printer = tmpPrinter;
        };
        this.printImports = function () {
            if (_this.imports.length == 0) {
                return;
            }
            var tmpPrinter = _this.printer;
            _this.printer = new p.StdOutPrinter;
            imports.importsToIncludes(_this.imports).forEach(function (include) {
                _this.printer.printLn(include);
            });
            _this.printer.printLn("");
            _this.printer = tmpPrinter;
        };
        this.printer = printer;
        this.checker = checker;
        this.tasks = [];
        this.imports = [];
    }
    return visitor;
}());
exports.visitor = visitor;
//# sourceMappingURL=visitor.js.map