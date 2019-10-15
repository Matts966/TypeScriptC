import * as tkernel from "../tkernel"

const taskA = new tkernel.Task((_ : Number) => {
    for (var i = 0; i < 3; i++) {
        console.log("output!");
    }
    return tkernel.result.ok
})

while (true) {
    taskA.start(1)
}
