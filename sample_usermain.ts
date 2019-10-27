import * as tkernel from "./tkernel"

const taskA = new class TaskA extends tkernel.Task {
    protected task() {
        for (let i = 0; i < 3; i++) {
            console.log("*** tk_wup_tsk to tsk_b.")
            if (taskB.wakeUp() != tkernel.result.ok)
                console.log(" *** Failed in tk_wup_tsk to tsk_b");
        }
    }
}()

const taskB = new class TaskB extends tkernel.Task {
    protected task() {
        console.log("*** tsk_b started.")
        while (true) {
            console.log("*** tsk_b is Waiting")
            this.sleep(tkernel.waitType.forever)
            console.log("*** tsk_b was Triggered")
        }
    }
}(2)

if (taskA.start(0) != tkernel.result.ok) {
    console.log(" *** Failed in start of tsk_a.")
    process.exit(1)
}
console.log("*** tsk_a started.")

if (taskB.wakeUp() != tkernel.result.ok) {
    console.log(" *** Failed in start of tsk_b.")
    process.exit(1)
}
console.log("*** tsk_b started.")

while (true) {
    tkernel.ask("Push any key to start tsk_a. ")
    console.log()
    taskA.start(0)
}
