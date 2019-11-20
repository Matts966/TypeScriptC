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
exports.isImportTKernel = function (i) {
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
exports.handleImport = function (node) {
    if (typescript_1["default"].isImportDeclaration(node)) {
        if (!exports.isImportTKernel(node)) {
            diag.emitDiagnostic(node, 'please import only tkernel by `import * as tkernel from "./tkernel"`');
            process.exit(1);
        }
        return true;
    }
    if (!tKernelImported) {
        diag.emitDiagnostic(node, 'please import only tkernel by `import * as tkernel from "./tkernel"`');
        process.exit(1);
    }
};
//# sourceMappingURL=imports.js.map