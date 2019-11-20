export enum IndentType { tab = '\t', space = '\s' }
export type PrinterOptions = {
    indentLevel?: number,
    indentType?: IndentType,
    withNewLine?: boolean,
}

// TODO: abstract printers by parent abstract class
export interface Printer {
    print : (s : string, p?: PrinterOptions) => Printer
    printLn : (s : string, p?: PrinterOptions) => Printer
    printWithoutSpace : (s : string) => void
    indent : () => Printer
    unindent : () => Printer
    setOptions : (p : PrinterOptions) => Printer
    removeSpaces : () => PrinterOptions
}

export class StdOutPrinter implements Printer {
    private options : PrinterOptions = {
        indentLevel: 0,
        indentType: IndentType.tab,
        withNewLine: false,
    };
    print(s : string, p = this.options) {
        if (p.indentLevel && p.indentLevel > 0) {
            const t = p.indentType || IndentType.tab
            s = t.repeat(p.indentLevel) + s
        }
        if (p.withNewLine) {
            console.log(s)
        } else {
            process.stdout.write(s)
        }
        return this
    }
    printLn(s : string, p = this.options) {
        const opt = { ...this.options }
        this.options = p
        this.options.withNewLine = true
        this.print(s, this.options)
        this.options = opt
        return this
    }
    printWithoutSpace(s : string) {
        process.stdout.write(s)
    }
    indent() {
        ++this.options.indentLevel!
        return this
    }
    unindent() {
        --this.options.indentLevel!
        return this
    }
    setOptions(p : PrinterOptions) {
        this.options = p
        return this
    }
    removeSpaces() {
        const tmpOptions = { ...this.options }
        this.options.indentLevel = 0
        this.options.withNewLine = false
        return tmpOptions
    }
}

export class BufferedPrinter implements Printer {
    private options : PrinterOptions = {
        indentLevel: 1,
        indentType: IndentType.tab,
        withNewLine: false,
    };
    private buffer = ""
    print(s : string, p = this.options) {
        if (p.indentLevel && p.indentLevel > 0) {
            const t = p.indentType || IndentType.tab
            s = t.repeat(p.indentLevel) + s
        }
        if (p.withNewLine) {
            this.buffer += s + '\n'
        } else {
            this.buffer += s
        }
        return this
    }
    printLn(s : string, p = this.options) {
        const opt = { ...this.options }
        this.options = p
        this.options.withNewLine = true
        this.print(s, this.options)
        this.options = opt
        return this
    }
    printWithoutSpace(s : string) {
        this.buffer += s
    }
    outputBuffer() {
        process.stdout.write(this.buffer)
    }
    indent() {
        ++this.options.indentLevel!
        return this
    }
    unindent() {
        --this.options.indentLevel!
        return this
    }
    setOptions(p : PrinterOptions) {
        this.options = p
        return this
    }
    removeSpaces() {
        const tmpOptions = { ...this.options }
        this.options.indentLevel = 0
        this.options.withNewLine = false
        return tmpOptions
    }
}
