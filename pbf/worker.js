const Pbf = require('pbf');
const Schema = require('./schema.js');


const decode = (message) => {
    const {method, params} = message;
    
    console.log(params)
    console.log(params.size);
    const pbf = new Pbf(params);
    return Schema[method].read(pbf);
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

