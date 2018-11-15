import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from "rollup-plugin-json";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
// const production = !process.env.ROLLUP_WATCH;

export default [{
        input: 'protobufjs/main.js',
        output: {
            name: "main",
            file: 'public/protobufjs-bundle.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(), // tells Rollup how to find date-fns in node_modules
            commonjs(), // converts date-fns to ES modules
            json(),
            // 		production && uglify() // minify, but only in production
        ]
    },
    {
        input: 'protobufjs/worker.js',
        output: {
            name: "main",
            file: 'public/protobufjs-worker.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(), // tells Rollup how to find date-fns in node_modules
            commonjs(), // converts date-fns to ES modules
            json(),
        ]
    },
    {
        input: 'pbf/main.js',
        output: {
            name: "main",
            file: 'public/pbf-bundle.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(), // tells Rollup how to find date-fns in node_modules
            commonjs(), // converts date-fns to ES modules
            json(),
        ]
    },
    {
        input: 'pbf/worker.js',
        output: {
            name: "main",
            file: 'public/pbf-worker.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(), // tells Rollup how to find date-fns in node_modules
            commonjs(), // converts date-fns to ES modules
            json(),
        ]
    },
    {
        input: 'jsonschema-msgpack-js/main.js',
        output: {
            name: "main",
            file: 'public/jsonschema-msgpack-js-bundle.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(), // tells Rollup how to find date-fns in node_modules
            commonjs(), // converts date-fns to ES modules
            json(),
        ]
    },
    {
        input: 'jsonschema-msgpack-js/worker.js',
        output: {
            name: "main",
            file: 'public/jsonschema-msgpack-js-worker.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(), // tells Rollup how to find date-fns in node_modules
            commonjs(), // converts date-fns to ES modules
            json(),
        ]
    }
];