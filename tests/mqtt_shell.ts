import * as tkernel from "../tkernel"
import * as mqtt from "../mqtt"

const taskMqttShell = new class TaskMqttShell extends tkernel.Task {
    protected task() {
        let client = new mqtt.MQTTClient
        client.host = "test.mosquitto.org"
        client.port = 1883;
        client.qos = 1;
        let result = mqtt.result.success
        while (true) {
            console.log("- Push c to connect.")
            console.log("- Push p to publish a message.")
            console.log("- Push s to subscribe to a topic.")
            console.log("- Push w to wait messages.")
            const c = tkernel.ask("- Push k to keep connection.")
            if (c == 'c') {
                result = client.connect()
            } else if (c == 'p') {
                let topic = tkernel.ask_line("topic: ")
                client.topic = topic
                let message = tkernel.ask_line("message: ")
                client.message = message
                result = client.publish()
            } else if (c == 's') {
                let topic = tkernel.ask_line("topic: ")
                client.topic = topic
                result = client.subscribe()
            } else if (c == 'w') {
                result = client.wait()
            } else if (c == 'k') {
                result = client.ping()
            }

            if (result != mqtt.result.success) {
                break;
            }
        }
        console.log(" *** MQTT shell: error occured.")
        tkernel.entryTask.wakeUp()
    }
}()
console.log("*** task_mqtt_shell created.");

while (true) {
    taskMqttShell.start(0)
    tkernel.sleep(tkernel.waitType.forever)
    console.log(" *** MQTT shell disconnected... Reseted context.")
}


// Network initialization
// NetDrv(0, NULL);
// so_main(0, NULL);
// net_conf(NET_CONF_EMULATOR, NET_CONF_DHCP);