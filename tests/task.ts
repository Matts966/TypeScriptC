import * as tkernel from "../tkernel"

class TaskA extends tkernel.Task {
    task = (_ : Number) => {
        for (var i = 0; i < 3; i++) {
            console.log("output!");
        }
    }
}

const taskA = new TaskA()
while (true) {
    taskA.start(1)
}
