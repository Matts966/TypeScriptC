"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const c = __importStar(require("./c"));
const diag = __importStar(require("./diagnostics"));
const visitors = __importStar(require("./visitors"));
const p = __importStar(require("./printer"));
const util = __importStar(require("./utilities"));
const main = () => {
    const program = util.getProgramFromArgV();
    // For future use
    const cnp = new c.Program();
    cnp.includes.push();
    // Apply type check
    let allDiagnostics = util.getPreEmitDiagnostics(program)
        .concat();
    if (allDiagnostics.length > 0) {
        diag.emitDiagnostics(allDiagnostics);
        process.exit(1);
    }
    // Type Checker initialization
    let checker = program.getTypeChecker();
    const visitor = new visitors.visitor(new p.BufferedPrinter(), checker);
    visitor.visitProgram(program);
    visitor.printIncludes();
    visitor.printTasks();
    console.log(`EXPORT INT usermain( void ) {`);
    if (visitor.useMessageBox.some((e) => e)) {
        console.log(`\tT_CMBF cmbf = { NULL, TA_TFIFO, 256, 5 };`);
    }
    if (visitor.tasks.length != 0) {
        console.log(`\tT_CTSK t_ctsk;
\tID objid;
\tt_ctsk.tskatr = TA_HLNG | TA_DSNAME;
`);
    }
    if (visitor.useNetwork) {
        console.log(`\t// Network initialization
\t#define NET_CONF_EMULATOR (1)
\t#define NET_CONF_DHCP   (1)
\tNetDrv(0, NULL);
\tso_main(0, NULL);
\tnet_conf(NET_CONF_EMULATOR, NET_CONF_DHCP);
`);
    }
    visitor.printer.outputBuffer();
    console.log(`}`);
};
main();
//# sourceMappingURL=index.js.map