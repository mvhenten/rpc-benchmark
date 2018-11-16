const RpcABC = require("../lib/rpc");

class JSONSchemaRpc extends RpcABC {
    get workerUrl() {
        return "./dist/jsonschema-clone-worker.bundle.js";
    }

    decode(message) {
        const { method, params } = message;
        return params;
    }

    encode(method, params) {
        return [params];
    }
}

module.exports = JSONSchemaRpc;
