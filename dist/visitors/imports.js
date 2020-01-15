"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var diag = __importStar(require("../diagnostics"));
var tKernelImported = false;
var getNameOfImport = function (i) {
    var ic = i.importClause;
    if (!ic)
        return null;
    var namedImport = ic.namedBindings;
    return namedImport.name.text;
};
var checkImport = function (node) {
    var name = getNameOfImport(node);
    // TODO: check contents
    if (name == 'tkernel' || name == 'mqtt') {
        return;
    }
    diag.emitDiagnostic(node, 'please import only tkernel or mqtt \
        by `import * as tkernel from "./tkernel"` or \
        by `import * as mqtt from "./mqtt"`.');
    process.exit(1);
};
exports.importsToIncludes = function (node) {
    var includesMap = new Map([
        ['tkernel', [
                "#include <tk/tkernel.h>",
                "#include <tm/tmonitor.h>",
                "#include <libstr.h>"
            ]],
        ['mqtt', [
                "#include \"wolfmqtt/mqtt_client.h\"",
                "#include \"examples/mqttnet.h\"",
                "#include \"examples/mqttclient/mqttclient.h\""
            ]]
    ]);
    checkImport(node);
    var name = getNameOfImport(node);
    if (name == null)
        return [];
    if (includesMap.get(name) == null)
        return [];
    return includesMap.get(name);
};
//# sourceMappingURL=imports.js.map