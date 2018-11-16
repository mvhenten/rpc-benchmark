const JSONSchemaRpc = require("./rpc");
const server = new JSONSchemaRpc();

server.initialize();

server.postMessage("AwesomeMessage", {
    message_string: "Hello World"
});
