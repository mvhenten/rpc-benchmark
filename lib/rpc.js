class RpcABC {
    get workerUrl() {
        throw new Error("Must implement workerUrl");
    }
    encode() {
        throw new Error("You must implement encode");
    }

    decode() {
        throw new Error("You must implement decode");
    }

    initialize() {
        const worker = new Worker(this.workerUrl);

        worker.onmessage = this.onMessage.bind(this);

        worker.onerror = (err) => {
            console.error(err);
        };

        worker.onmessageerror = (err) => {
            console.error(err);
        };

        this.Messages = new Map();
        this.worker = worker;
    }

    onMessage(evt) {
        const { method, params, id } = evt.data;

        const [message, start] = this.Messages.get(id);

        console.log("Ack: ", Date.now() - start, message.params.byteLength, params);
    }

    postMessage(method, payload) {
        const [params, transferables] = this.encode(method, payload);

        const message = {
            jsonrpc: "2.0",
            id: [Date.now().toString(36), Math.random().toString(36)].join("-"),
            method,
            params,
        };

        this.Messages.set(message.id, [message, Date.now()]);
        this.worker.postMessage(message, transferables);
    }
}

module.exports = RpcABC;