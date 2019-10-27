export abstract class Task {
    protected abstract task(info : number) : void
    private stackSize : number = 1024
    private priority : number = 1
    static readonly id : number
    public start(info : number) { return result.ok }
    protected sleep(t : timeOut) { return result.ok }
    public wakeUp() { return result.ok }
    constructor(priority?: number, stackSize?: number) {
        if (priority) this.priority = priority
        if (stackSize) this.stackSize = stackSize
    }
}

export const ask = (_ : string) => { }

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
