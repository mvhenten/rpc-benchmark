const entries = [
    {
        name: "jsonschema-msgpack-js",
        Rpc: require("./jsonschema-msgpack-js/rpc")
    },
    {
        name: "protobufjs",
        Rpc: require("./protobufjs/rpc")
    }
];

for (let entry of entries) {
    const {Rpc, name} = entry;
    
    console.log("benchmarking", name);
    const server = new Rpc();
    
    server.initialize();

    server.postMessage("AwesomeMessage", {
        messageString: "Hello World"
    });
    
    
}