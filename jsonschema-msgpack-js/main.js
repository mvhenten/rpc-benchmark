const RpcABC = require("../lib/rpc");
const msgpack = require("msgpack-js");
const schema = require("./schema.json");
const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const validate = ajv.compile(schema);


class JSONSchemaRpc extends RpcABC {
    get workerUrl() {
        return "./protobufjs-worker.js";
    }

    encode(method, params) {
        const valid = validate(params);

        if (!valid)
            throw new Error(validate.errors.join(",\n"));

        const data = msgpack.encode(params);

        console.log(data, 'data');

        console.log(typeof data, 'typeof data');

        return [params];
    }
}


const server = new JSONSchemaRpc();

server.initialize();

server.postMessage("AwesomeMessage", {
    message_string: "Hello World"
});
