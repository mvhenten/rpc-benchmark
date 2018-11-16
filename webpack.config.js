module.exports = {
    devtool: "inline-source-map",
    entry: {
        "benchmark": "./benchmark.js",
        "pbf-worker": "./pbf/worker.js",
        "structured-clone-worker": "./structured-clone/worker.js",
        "jsonschema-clone-worker": "./jsonschema-clone/worker.js",
        "jsonschema-msgpack-js-worker": "./jsonschema-msgpack-js/worker.js",
        "protobufjs-worker": "./protobufjs/worker.js"
    },
    resolve: {
        extensions: [".js"],
    },
    output: {
        filename: "[name].bundle.js",
    },
};
