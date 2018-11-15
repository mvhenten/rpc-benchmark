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
        
        console.log(params, 'got params');
        console.log(method, 'method');

        const handler = Methods[method];
        
                console.log(params.byteLength, params.length);

        

        const uint8 = new Uint8Array(params, 0, params.length);
        
        console.log(uint8);
        
        try {
            const res = handler.decode(uint8);
            return res;
        }
        catch (err) {
            console.error("Error decoding " + method);
            throw err;
        }
    }


    encode(method, params) {
        const handler = Methods[method];
        console.log(params);
        const err = handler.verify(params);

        if (err) throw new Error(err);

        const uint8 = handler.encode(params).finish();
        
        console.log(uint8);
        
        const buffer = uint8.buffer.slice(0, uint8.byteLength);
        // const buffer = uint8.buffer;
        
        console.log(uint8.byteLength, uint8.length);
        console.log(buffer.byteLength, buffer.length);
        
        this.decode({ method: "AwesomeMessage", params: buffer});
        

        return [buffer, [buffer]];
    }
}

module.exports = ProtobufJSRPC;