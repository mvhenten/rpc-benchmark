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
    
    report() {
        return {
            average: (this.timing.reduce((sum, t) => sum+t, 0) / this.timing.length).toFixed(3),
            max: Math.max(...this.timing).toFixed(3),
            min: Math.min(...this.timing).toFixed(3),
        };
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
        this.timing = [];
    }

    onMessage(evt) {
        const { method, params, id } = evt.data;
        const [message, start] = this.Messages.get(id);
        
        if (!message) throw new Error("unexpected message received");
        
        const duration = performance.now() - start;

        this.timing.push(duration);
        this.Messages.delete(id);
        
        if (this.Messages.size == 0) this.finish();
    }

    postMessage(method, payload) {
        const [params, transferables] = this.encode(method, payload);

        const message = {
            jsonrpc: "2.0",
            id: [Date.now().toString(36), Math.random().toString(36)].join("-"),
            method,
            params,
        };
        
        this.Messages.set(message.id, [message, performance.now(), params.byteLength || 'n/a']);
        this.worker.postMessage(message, transferables);
    }
}

module.exports = RpcABC;