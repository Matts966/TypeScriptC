"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IndentType;
(function (IndentType) {
    IndentType["tab"] = "\t";
    IndentType["space"] = "s";
})(IndentType = exports.IndentType || (exports.IndentType = {}));
class StdOutPrinter {
    constructor() {
        this.options = {
            indentLevel: 0,
            indentType: IndentType.tab,
            withNewLine: false,
        };
    }
    print(s, p = this.options) {
        if (p.indentLevel && p.indentLevel > 0) {
            const t = p.indentType || IndentType.tab;
            s = t.repeat(p.indentLevel) + s;
        }
        if (p.withNewLine) {
            console.log(s);
        }
        else {
            process.stdout.write(s);
        }
        return this;
    }
    printLn(s, p = this.options) {
        const opt = { ...this.options };
        this.options = p;
        this.options.withNewLine = true;
        this.print(s, this.options);
        this.options = opt;
        return this;
    }
    printWithoutSpace(s) {
        process.stdout.write(s);
    }
    indent() {
        ++this.options.indentLevel;
        return this;
    }
    unindent() {
        --this.options.indentLevel;
        return this;
    }
    setOptions(p) {
        this.options = p;
        return this;
    }
    removeSpaces() {
        const tmpOptions = { ...this.options };
        this.options.indentLevel = 0;
        this.options.withNewLine = false;
        return tmpOptions;
    }
}
exports.StdOutPrinter = StdOutPrinter;
class BufferedPrinter {
    constructor() {
        this.options = {
            indentLevel: 1,
            indentType: IndentType.tab,
            withNewLine: false,
        };
        this.buffer = "";
    }
    print(s, p = this.options) {
        if (p.indentLevel && p.indentLevel > 0) {
            const t = p.indentType || IndentType.tab;
            s = t.repeat(p.indentLevel) + s;
        }
        if (p.withNewLine) {
            this.buffer += s + '\n';
        }
        else {
            this.buffer += s;
        }
        return this;
    }
    printLn(s, p = this.options) {
        const opt = { ...this.options };
        this.options = p;
        this.options.withNewLine = true;
        this.print(s, this.options);
        this.options = opt;
        return this;
    }
    printWithoutSpace(s) {
        this.buffer += s;
    }
    outputBuffer() {
        process.stdout.write(this.buffer);
    }
    indent() {
        ++this.options.indentLevel;
        return this;
    }
    unindent() {
        --this.options.indentLevel;
        return this;
    }
    setOptions(p) {
        this.options = p;
        return this;
    }
    removeSpaces() {
        const tmpOptions = { ...this.options };
        this.options.indentLevel = 0;
        this.options.withNewLine = false;
        return tmpOptions;
    }
}
exports.BufferedPrinter = BufferedPrinter;
//# sourceMappingURL=printer.js.map