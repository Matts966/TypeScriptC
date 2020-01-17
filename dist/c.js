"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Program {
    constructor() {
        this.includes = Array();
        this.include("tk/tkernel.h");
        this.include("tm/tmonitor.h");
        this.include("libstr.h");
        this.definitions = Array();
    }
    include(identifier, includeCurrentPath = false) {
        this.includes.push(new Include(identifier, includeCurrentPath));
    }
}
exports.Program = Program;
class Include {
    constructor(identifier, includeCurrentPath = false) {
        if (includeCurrentPath)
            this.type = "quote";
        else
            this.type = "triangle";
        this.identifier = identifier;
    }
}
class Definition {
}
//# sourceMappingURL=c.js.map