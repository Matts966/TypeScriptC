import * as tkernel from "../tkernel"

const taskA = new class TaskA extends tkernel.Task {
    protected task() {
        while (true) {
            tkernel.ask("Push any key to say hello to task_b ")
            console.log()
            taskB.send(tkernel.waitType.forever)
            this.receive(tkernel.waitType.forever)
            console.log(" *** task_a message received!")
        }
    }
}(5, 5)
console.log("*** task_a created.");

const taskB = new class TaskB extends tkernel.Task {
    protected task() {
        while (true) {
            this.receive(tkernel.waitType.forever)
            console.log(" *** task_b message received!")
            tkernel.ask("Push any key to say hello to task_a ")
            console.log()
            taskA.send(tkernel.waitType.forever)
        }
    }
}(5, 5)
console.log("*** task_b created.")

if (taskA.start(0) != tkernel.result.ok) {
    console.log(" *** Failed in start of task_a.")
    process.exit(1)
}

if (taskB.start(0) != tkernel.result.ok) {
    console.log(" *** Failed in start of task_b.")
    process.exit(1)
}
