const RpcABC = require("../lib/rpc");

const schema = require("./schema.json");
const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const validate = ajv.compile(schema);


class JSONSchemaRpc extends RpcABC {
    get workerUrl() {
        return "./dist/jsonschema-clone-worker.bundle.js";
    }

    decode(message) {
        const { method, params } = message;
        
        const valid = validate(params);

        if (!valid)
            throw new Error(validate.errors.join(",\n"));

        return params;
    }

    encode(method, params) {
        const valid = validate(params);

        if (!valid)
            throw new Error(validate.errors.join(",\n"));

        return [params];
    }
}

module.exports = JSONSchemaRpc;
