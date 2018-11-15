module.exports = {
    devtool: "inline-source-map",
    entry: {
        "benchmark": "./benchmark.js",
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
