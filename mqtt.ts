export class MQTTClient {
    host : string
    port : number
    qos : number
    topic_name : string
    message : string
    public connect() { return result.success }
    public publish() { return result.success }
    public subscribe() { return result.success }
    public wait() { return result.success }
    public ping() { return result.success }
    constructor() {
        this.host = ""
        this.port = 0
        this.qos = 0
        this.topic_name = ""
        this.message = ""
    }
}

export const enum result {
    success = "success",
}
