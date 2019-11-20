"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var typescript_1 = __importDefault(require("typescript"));
exports.isGlobal = function (node) {
    if (typescript_1["default"].isSourceFile(node.parent))
        return true;
    return false;
};
exports.camelToSnake = function (s, big) {
    if (big === void 0) { big = false; }
    s = s.slice(0, 1).toLowerCase() + s.slice(1);
    var snake = s.replace(/[A-Z]/g, function (letter) { return "_" + letter.toLowerCase(); });
    if (big) {
        return snake.toUpperCase();
    }
    return snake;
};
exports.getTypeString = function (node, checker) {
    var type = checker.getTypeAtLocation(node);
    var typeName = checker.typeToString(type);
    var splited = typeName.split(" ");
    if (splited.length != 1) {
        return exports.camelToSnake(splited[1]);
    }
    return exports.camelToSnake(typeName);
};
//# sourceMappingURL=utilities.js.map