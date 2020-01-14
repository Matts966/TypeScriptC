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
var diag = __importStar(require("../diagnostics"));
var tKernelImported = false;
var isImportKnown = function (i) {
    var ic = i.importClause;
    if (!ic)
        return;
    var namedImport = ic.namedBindings;
    if (namedImport.name.text != "tkernel") {
        return false;
    }
    tKernelImported = true;
    return true;
};
exports.handleImport = function (node, visitor) {
    if (typescript_1["default"].isImportDeclaration(node)) {
        if (!isImportKnown(node)) {
            diag.emitDiagnostic(node, 'please import only tkernel or mqtt \
                by `import * as tkernel from "./tkernel"` \
                or `import * as mqtt from "./mqtt"`');
            process.exit(1);
        }
        return true;
    }
    if (!tKernelImported) {
        diag.emitDiagnostic(node, 'please import only tkernel or mqtt \
            by `import * as tkernel from "./tkernel"` \
            or `import * as mqtt from "./mqtt"`');
        process.exit(1);
    }
};
exports.importsToIncludes = function (imports) {
    return [
        "#include <tk/tkernel.h>",
        "#include <tm/tmonitor.h>",
        "#include <libstr.h>"
    ];
};
//# sourceMappingURL=imports.js.map