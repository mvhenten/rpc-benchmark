const Pbf = require('pbf');
const Schema = require('./schema.js');


const decode = (message) => {
};

onmessage = (evt) => {
    const params = decode(evt.data);
    const {jsonrpc, id} = evt.data;

    console.log("hello params", params);

    postMessage({
        jsonrpc,
        method: "ack",
        id
    });
};

