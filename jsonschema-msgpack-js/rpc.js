const RpcABC = require("../lib/rpc");

const msgpack = require("msgpack-js");
const schema = require("./schema.json");
const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const validate = ajv.compile(schema);


class JSONSchemaRpc extends RpcABC {
    get workerUrl() {
        return "./dist/jsonschema-msgpack-js-worker.bundle.js";
    }

    decode(message) {
        const { method, params } = message;

        try {
            const data = msgpack.decode(params);
            const valid = validate(data);

            if (!valid)
                throw new Error(validate.errors.join(",\n"));

            return data;

        }
        catch (err) {
            console.log("Failed to decode message:");
            throw err;
        }
    }

    encode(method, params) {
        const valid = validate(params);

        if (!valid)
            throw new Error(validate.errors.join(",\n"));

        const data = msgpack.encode(params);

        return [data, [data.buffer]];
    }
}

module.exports = JSONSchemaRpc;
