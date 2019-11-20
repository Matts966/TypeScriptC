"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var IndentType;
(function (IndentType) {
    IndentType["tab"] = "\t";
    IndentType["space"] = "s";
})(IndentType = exports.IndentType || (exports.IndentType = {}));
var StdOutPrinter = /** @class */ (function () {
    function StdOutPrinter() {
        this.options = {
            indentLevel: 0,
            indentType: IndentType.tab,
            withNewLine: false
        };
    }
    StdOutPrinter.prototype.print = function (s, p) {
        if (p === void 0) { p = this.options; }
        if (p.indentLevel && p.indentLevel > 0) {
            var t = p.indentType || IndentType.tab;
            s = t.repeat(p.indentLevel) + s;
        }
        if (p.withNewLine) {
            console.log(s);
        }
        else {
            process.stdout.write(s);
        }
        return this;
    };
    StdOutPrinter.prototype.printLn = function (s, p) {
        if (p === void 0) { p = this.options; }
        var opt = __assign({}, this.options);
        this.options = p;
        this.options.withNewLine = true;
        this.print(s, this.options);
        this.options = opt;
        return this;
    };
    StdOutPrinter.prototype.printWithoutSpace = function (s) {
        process.stdout.write(s);
    };
    StdOutPrinter.prototype.indent = function () {
        ++this.options.indentLevel;
        return this;
    };
    StdOutPrinter.prototype.unindent = function () {
        --this.options.indentLevel;
        return this;
    };
    StdOutPrinter.prototype.setOptions = function (p) {
        this.options = p;
        return this;
    };
    StdOutPrinter.prototype.removeSpaces = function () {
        var tmpOptions = __assign({}, this.options);
        this.options.indentLevel = 0;
        this.options.withNewLine = false;
        return tmpOptions;
    };
    return StdOutPrinter;
}());
exports.StdOutPrinter = StdOutPrinter;
var BufferedPrinter = /** @class */ (function () {
    function BufferedPrinter() {
        this.options = {
            indentLevel: 1,
            indentType: IndentType.tab,
            withNewLine: false
        };
        this.buffer = "";
    }
    BufferedPrinter.prototype.print = function (s, p) {
        if (p === void 0) { p = this.options; }
        if (p.indentLevel && p.indentLevel > 0) {
            var t = p.indentType || IndentType.tab;
            s = t.repeat(p.indentLevel) + s;
        }
        if (p.withNewLine) {
            this.buffer += s + '\n';
        }
        else {
            this.buffer += s;
        }
        return this;
    };
    BufferedPrinter.prototype.printLn = function (s, p) {
        if (p === void 0) { p = this.options; }
        var opt = __assign({}, this.options);
        this.options = p;
        this.options.withNewLine = true;
        this.print(s, this.options);
        this.options = opt;
        return this;
    };
    BufferedPrinter.prototype.printWithoutSpace = function (s) {
        this.buffer += s;
    };
    BufferedPrinter.prototype.outputBuffer = function () {
        process.stdout.write(this.buffer);
    };
    BufferedPrinter.prototype.indent = function () {
        ++this.options.indentLevel;
        return this;
    };
    BufferedPrinter.prototype.unindent = function () {
        --this.options.indentLevel;
        return this;
    };
    BufferedPrinter.prototype.setOptions = function (p) {
        this.options = p;
        return this;
    };
    BufferedPrinter.prototype.removeSpaces = function () {
        var tmpOptions = __assign({}, this.options);
        this.options.indentLevel = 0;
        this.options.withNewLine = false;
        return tmpOptions;
    };
    return BufferedPrinter;
}());
exports.BufferedPrinter = BufferedPrinter;
//# sourceMappingURL=printer.js.map