const Rpc = require("./rpc");
const rpc = new Rpc();

onmessage = async (evt) => {
    const params = rpc.decode(evt.data);
    const {jsonrpc, id} = evt.data;

    postMessage({
        jsonrpc,
        method: "ack",
        params: {
            words: params.messageString.match(/(\w+)/).length
        },
        id
    });
};

