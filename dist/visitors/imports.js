"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const diag = __importStar(require("../diagnostics"));
let tKernelImported = false;
const getNameOfImport = (i) => {
    const ic = i.importClause;
    if (!ic)
        return null;
    let namedImport = ic.namedBindings;
    return namedImport.name.text;
};
const checkImport = (node) => {
    const name = getNameOfImport(node);
    // TODO: check contents
    if (name == 'tkernel' || name == 'mqtt') {
        return;
    }
    diag.emitDiagnostic(node, 'please import only tkernel or mqtt \
        by `import * as tkernel from "./tkernel"` or \
        by `import * as mqtt from "./mqtt"`.');
    process.exit(1);
};
exports.importsToIncludes = (node) => {
    let includesMap = new Map([
        ['tkernel', [
                `#include <tk/tkernel.h>`,
                `#include <tm/tmonitor.h>`,
                `#include <libstr.h>`
            ]],
        ['mqtt', [
                `#include "wolfmqtt/mqtt_client.h"`,
                `#include "examples/mqttnet.h"`,
                `#include "examples/mqttclient/mqttclient.h"`
            ]]
    ]);
    checkImport(node);
    const name = getNameOfImport(node);
    if (name == null)
        return [];
    if (includesMap.get(name) == null)
        return [];
    return includesMap.get(name);
};
//# sourceMappingURL=imports.js.map