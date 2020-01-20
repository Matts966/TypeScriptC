export abstract class Task {
    protected abstract task(info : number) : void
    private stackSize : number = 1024
    private priority : number = 1
    private messageBoxSize : number = 0
    static readonly id : number
    public start(info : number) { return result.ok }
    protected sleep(t : timeOut) { return result.ok }
    public wakeUp() { return result.ok }
    protected receive(t : timeOut) { return "" }
    public send(t : timeOut) { return result.ok }
    constructor(priority?: number, messageBoxSize?: number, stackSize?: number) {
        if (priority) this.priority = priority
        if (stackSize) this.stackSize = stackSize
        if (messageBoxSize) this.messageBoxSize = messageBoxSize
    }
}

export const entryTask = new class EntryTask extends Task {
    protected task() { }
}

export const sleep = (t : timeOut) => { return result.ok }

export const ask = (_ : string) => 'a' as char
export const ask_line = (_ : string) => { return ""; }

export const enum result {
    ok = "ok",
    sys = "system error",
    nocop = "nocop",
}

export type Result = result.ok | result.sys | result.nocop

export type uint = number
export type timeOut = waitType.forever | waitType.polling | uint
export enum waitType {
    forever = "forever",
    polling = "polling",
}

type char = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k'
    | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x'
    | 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K'
    | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X'
    | 'Y' | 'Z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '!'
    | '?'
