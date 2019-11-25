"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var c = __importStar(require("./c"));
var diag = __importStar(require("./diagnostics"));
var visitors = __importStar(require("./visitors"));
var p = __importStar(require("./printer"));
var util = __importStar(require("./utilities"));
var main = function () {
    var program = util.getProgramFromArgV();
    // For future use
    var cnp = new c.Program();
    cnp.includes.push();
    // Apply type check
    var allDiagnostics = util.getPreEmitDiagnostics(program)
        .concat();
    if (allDiagnostics.length > 0) {
        diag.emitDiagnostics(allDiagnostics);
        process.exit(1);
    }
    console.log("#include <tk/tkernel.h>\n#include <tm/tmonitor.h>\n#include <libstr.h>\n");
    // Type Checker initialization
    var checker = program.getTypeChecker();
    var visitor = new visitors.visitor(new p.BufferedPrinter(), checker);
    visitor.visitProgram(program);
    visitor.printTasks();
    console.log("EXPORT INT usermain( void ) {");
    if (visitor.tasks.length != 0) {
        console.log("\tT_CTSK t_ctsk;\n\tID objid;\n\tt_ctsk.tskatr = TA_HLNG | TA_DSNAME;\n");
    }
    visitor.printer.outputBuffer();
    console.log("}");
};
main();
//# sourceMappingURL=index.js.map