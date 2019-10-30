"use strict";
exports.__esModule = true;
var Program = /** @class */ (function () {
    function Program() {
        this.includes = Array();
        this.include("tk/tkernel.h");
        this.include("tm/tmonitor.h");
        this.include("libstr.h");
        this.definitions = Array();
    }
    Program.prototype.include = function (identifier, includeCurrentPath) {
        if (includeCurrentPath === void 0) { includeCurrentPath = false; }
        this.includes.push(new Include(identifier, includeCurrentPath));
    };
    return Program;
}());
exports.Program = Program;
var Include = /** @class */ (function () {
    function Include(identifier, includeCurrentPath) {
        if (includeCurrentPath === void 0) { includeCurrentPath = false; }
        if (includeCurrentPath)
            this.type = "quote";
        else
            this.type = "triangle";
        this.identifier = identifier;
    }
    return Include;
}());
var Definition = /** @class */ (function () {
    function Definition() {
    }
    return Definition;
}());
//# sourceMappingURL=c.js.map