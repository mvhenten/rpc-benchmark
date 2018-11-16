const RpcABC = require("../lib/rpc");
const schema = require("./schema.js");
const { awesomepackage } = schema;
const Methods = awesomepackage;


class ProtobufJSRPC extends RpcABC {
    get workerUrl() {
        return "./dist/protobufjs-worker.bundle.js";
    }
    
    decode(message) {
        const {method, params} = message;
        const handler = Methods[method];

        try {
            const res = handler.decode(params);
            return res;
        }
        catch (err) {
            console.error("Error decoding " + method);
            throw err;
        }
    }


    encode(method, params) {
        const handler = Methods[method];
        const err = handler.verify(params);

        if (err) throw new Error(err);

        const encoded = handler.encode(params).finish();
        const uint8 = new Uint8Array(encoded);

        return [uint8, [uint8.buffer]];
    }
}

module.exports = ProtobufJSRPC;