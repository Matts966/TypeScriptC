export class Task {
    task: (info: Number) => void
    stackSize: Number = 1024
    priority: Number = 1
    readonly id: Number
    readonly start: (info: Number) => Result
    readonly sleep: (t: waitType) => Result
    readonly wakeUp: () => Result
    constructor(task: (info: Number) => Result){
        this.task = task
    }
}

// export interface Task {
//     task: () => void
//     stackSize: Number
//     priority: Number
//     readonly id: Number
//     readonly start: (Number) => error
//     readonly sleep: () => error
// }

export const ask = (_: string) => {}

export const enum result {
    ok = "ok",
    sys = "system error",
    nocop = "nocop",
}

export type Result = result.ok | result.sys | result.nocop

export enum waitType {
    polling,
    forever,
}
