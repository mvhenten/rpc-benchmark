const Pbf = require('pbf');
const Schema = require('./schema.js');

const pbf = new Pbf();

const Messages = new Map();

const encode = (method, params) => {
    Schema[method].write(params, pbf);
    return pbf.finish().buffer;
};

const postMessage = (worker, method, params) => {
    console.log("encoding", params);
    params = encode(method, params);

    const message = {
        jsonrpc: "2.0",
        id: [Date.now().toString(36), Math.random().toString(36)].join("-"),
        method,
        params,
    };

    console.log(params);
    console.log(typeof params);

    Messages.set(message.id, [message, Date.now()]);
    worker.postMessage(message, [params]);
};

const startWorker = () => {
    const worker = new Worker("./pbf-worker.js");

    worker.onmessage = (evt) => {
        const {method, id} = evt.data;

        const [message, start] = Messages.get(id);

        console.log("Ack: ", Date.now() - start, message.params.byteLength);
    };

    worker.onerror = (err) => {
        console.error(err);
    };

    worker.onmessageerror = (err) => {
        console.error(err);
    };

    postMessage(worker, "AwesomeMessage", {
        awesome_field: "Hello World"
    });
};

startWorker();