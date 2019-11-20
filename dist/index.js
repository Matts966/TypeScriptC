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
var c = __importStar(require("./c"));
var util = __importStar(require("./utilities"));
var diag = __importStar(require("./diagnostics"));
var visitors = __importStar(require("./visitors"));
var p = __importStar(require("./printer"));
// Initial file settings
var fileNames = process.argv.slice(2);
var program = typescript_1["default"].createProgram(fileNames, {
    target: typescript_1["default"].ScriptTarget.ESNext,
    module: typescript_1["default"].ModuleKind.ESNext,
    strict: true,
    strictNullChecks: true,
    noImplicitAny: true
});
// Type Checker initialization
var checker = program.getTypeChecker();
var printer = new p.BufferedPrinter();
var printTasks = function (v) {
    if (v.tasks.length == 0) {
        return;
    }
    var tmpPrinter = printer;
    printer = new p.StdOutPrinter;
    var taskNames = v.tasks.map(function (m) {
        return util.getTypeString(m.parent, v.checker);
    });
    printer.printLn("typedef enum { " + taskNames.map(function (name) { return name.toUpperCase() + ", "; }).join('') + "OBJ_KIND_NUM } OBJ_KIND;");
    printer.printLn("EXPORT ID ObjID[OBJ_KIND_NUM];");
    printer.printLn("");
    v.tasks.forEach(function (m) {
        var taskSig = "EXPORT void " + util.getTypeString(m.parent, v.checker) + "(INT stacd, VP exinf)";
        printer.printLn(taskSig + ';');
        printer.print(taskSig + " ");
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
        v.visit(m.body);
        printer.printLn("");
    });
    printer = tmpPrinter;
};
exports.main = function () {
    // For future use
    var cnp = new c.Program();
    cnp.includes.push();
    // Apply type check
    var allDiagnostics = typescript_1["default"].getPreEmitDiagnostics(program)
        .concat();
    if (allDiagnostics.length > 0) {
        diag.emitDiagnostics(allDiagnostics);
        process.exit(1);
    }
    console.log("#include <tk/tkernel.h>\n#include <tm/tmonitor.h>\n#include <libstr.h>\n");
    var visitor = new visitors.visitor(new p.BufferedPrinter(), checker);
    // Main loop
    for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
        var sourceFile = _a[_i];
        if (!sourceFile.isDeclarationFile && !sourceFile.fileName.endsWith("tkernel.ts")) {
            // using checker sample
            var symbol = checker.getSymbolAtLocation(sourceFile);
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
            typescript_1["default"].forEachChild(sourceFile, visitor.visit);
        }
    }
    printTasks(visitor);
    console.log("EXPORT INT usermain( void ) {");
    if (visitor.tasks.length != 0) {
        console.log("\tT_CTSK t_ctsk;\n\tID objid;\n\tt_ctsk.tskatr = TA_HLNG | TA_DSNAME;\n");
    }
    printer.outputBuffer();
    console.log("}");
};
exports.main();
//# sourceMappingURL=index.js.map