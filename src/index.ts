import * as c from './c'
import * as diag from './diagnostics'
import * as visitors from './visitors'
import * as p from './printer'
import * as util from './utilities'

const main = () => {
    const program = util.getProgramFromArgV()

    // For future use
    const cnp = new c.Program()
    cnp.includes.push()

    // Apply type check
    let allDiagnostics = util.getPreEmitDiagnostics(program)
        .concat()
    if (allDiagnostics.length > 0) {
        diag.emitDiagnostics(allDiagnostics)
        process.exit(1)
    }

    // Type Checker initialization
    let checker = program.getTypeChecker()

    const visitor = new visitors.visitor(new p.BufferedPrinter(), checker)

    visitor.visitProgram(program)

    visitor.printIncludes()

    if (visitor.useGC) {
        console.log(`#include "gc.h"\n`)
    }

    visitor.printFucntions()

    visitor.printTasks()

    console.log(`EXPORT INT usermain( void ) {`)
    if (visitor.useGC) {
        console.log(`\tbyte __a;
\tgc_start(&gc, &__a);\n`)
    }
    if (visitor.useMessageBox.some((e) => e)) {
        console.log(`\tT_CMBF cmbf = { NULL, TA_TFIFO, 256, 5 };`)
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

    (visitor.printer as p.BufferedPrinter).outputBuffer()

    if (visitor.useGC) {
        console.log(`\n\tgc_stop(&gc);`)
    }

    console.log(`}`)
}

main()
