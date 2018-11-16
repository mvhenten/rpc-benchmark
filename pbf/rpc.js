const RpcABC = require("../lib/rpc");
const Pbf = require("pbf");
const Schema = require("./schema.js");

class PbfRPC extends RpcABC {
    get workerUrl() {
        return "./dist/pbf-worker.bundle.js";
    }
    
    decode(message) {
        const {method, params} = message;
        const pbf = new Pbf(params);
        return Schema[method].read(pbf);
    }


    encode(method, params) {
        const pbf = new Pbf();
        Schema[method].write(params, pbf);

        const uint8 = pbf.finish();
        const buffer = uint8.buffer.slice(0, uint8.byteLength);

        return [buffer, [buffer]];
    }

}

module.exports = PbfRPC;