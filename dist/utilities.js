"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
exports.isGlobal = (node) => {
    if (typescript_1.default.isSourceFile(node.parent))
        return true;
    return false;
};
exports.camelToSnake = (s, big = false) => {
    s = s.slice(0, 1).toLowerCase() + s.slice(1);
    const snake = s.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    if (big) {
        return snake.toUpperCase();
    }
    return snake;
};
exports.getTypeStringInSnakeCase = (node, checker) => {
    const type = checker.getTypeAtLocation(node);
    const typeName = checker.typeToString(type);
    const splited = typeName.split(" ");
    if (splited.length != 1) {
        return exports.camelToSnake(splited[1]);
    }
    return exports.camelToSnake(typeName);
};
exports.getTypeString = (node, checker) => {
    const type = checker.getTypeAtLocation(node);
    return checker.typeToString(type);
};
exports.getProgramFromArgV = () => {
    let fileNames = process.argv.slice(2);
    return typescript_1.default.createProgram(fileNames, {
        target: typescript_1.default.ScriptTarget.ESNext,
        module: typescript_1.default.ModuleKind.ESNext,
        strict: true,
        strictNullChecks: true,
        noImplicitAny: true,
    });
};
exports.getPreEmitDiagnostics = (p) => {
    return typescript_1.default.getPreEmitDiagnostics(p);
};
//# sourceMappingURL=utilities.js.map