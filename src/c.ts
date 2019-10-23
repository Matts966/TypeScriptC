export namespace c {
    export class Program {
        includes : Include[]
        definitions : Definition[]
        include(identifier : string, includeCurrentPath = false) {
            this.includes.push(new Include(identifier, includeCurrentPath))
        }
        constructor() {
            this.includes = Array<Include>()
            this.include("tk/tkernel.h")
            this.include("tm/tmonitor.h")
            this.include("libstr.h")
            this.definitions = Array<Definition>()
        }
    }
    class Include {
        type : "triangle" | "quote"
        identifier : string
        constructor(identifier : string, includeCurrentPath = false) {
            if (includeCurrentPath) this.type = "quote"
            else this.type = "triangle"
            this.identifier = identifier
        }
    }
    class Definition { }
}
