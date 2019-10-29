import * as tkernel from "../tkernel"

const taskA = new class TaskA extends tkernel.Task {
    protected task() {
        for (let i = 0; i < 3; i++) {
            console.log("*** tk_wup_tsk to task_b.")
            if (taskB.wakeUp() != tkernel.result.ok)
                console.log(" *** Failed in tk_wup_task to task_b");
        }
    }
}()
console.log("*** task_a created.");

const taskB = new class TaskB extends tkernel.Task {
    protected task() {
        console.log("*** task_b started.")
        while (true) {
            console.log("*** task_b is Waiting")
            this.sleep(tkernel.waitType.forever)
            console.log("*** task_b was Triggered")
        }
    }
}(2)
console.log("*** task_b created.")

if (taskB.start(0) != tkernel.result.ok) {
    console.log(" *** Failed in start of task_b.")
    process.exit(1)
}
console.log("*** task_b started.")

while (true) {
    tkernel.ask("Push any key to start task_a. ")
    console.log()
    taskA.start(0)
}
