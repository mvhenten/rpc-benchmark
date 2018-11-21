const RpcABC = require("../lib/rpc");

const schema = require("./schema.json");
const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const validate = ajv.compile(schema);


class JSONSchemaRpc extends RpcABC {
    get workerUrl() {
        return "./dist/jsonschema-json-stringify.bundle.js";
    }

    decode(message) {
        const { method, params } = message;

        const parsed = JSON.parse(params);
        const valid = validate(parsed);

        if (!valid)
            throw new Error(validate.errors.join(",\n"));

        return parsed;
    }

    encode(method, params) {
        const valid = validate(params);

        if (!valid)
            throw new Error(validate.errors.join(",\n"));

        return [JSON.stringify(params)];
    }
}

module.exports = JSONSchemaRpc;
