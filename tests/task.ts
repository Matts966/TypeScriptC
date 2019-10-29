import * as tkernel from "../tkernel"

const taskA = new class TaskA extends tkernel.Task {
    protected task(_ : Number) {
        for (var i = 0; i < 3; i++) {
            console.log("output!");
        }
    }
}()

while (true) {
    taskA.start(0)
}
