const RpcABC = require("../lib/rpc");
const schema = require("./schema.js");
const { awesomepackage } = schema;
const Methods = awesomepackage;


class ProtobufJS extends RpcABC {
    get workerUrl() {
        return "./protobufjs-worker.js";
    }

    encode(method, params) {
        const handler = Methods[method];
        const err = handler.verify(params);

        if (err) throw new Error(err);

        const buffer = handler.encode(params).finish().buffer;

        return [buffer, [buffer]];
    }
}


const server = new ProtobufJS();

server.initialize();


server.postMessage("AwesomeMessage", {
    awesome_field: "Hello World"
});
