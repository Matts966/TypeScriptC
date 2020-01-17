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

export const parentTask = new class TaskA extends Task {
    protected task() { }
}

export const sleep = (t : timeOut) => { return result.ok }

export const ask = (_ : string) => { }
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
