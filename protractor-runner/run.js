#!/usr/bin/env node

const yargs = require("yargs");
const ProtractorLauncher = require("protractor/built/launcher");
const {ProtractorConfig} = require("./protractor.conf.js");

process.on("unhandledRejection", (err) => {
    throw err;
});

const options = yargs
    .usage("Usage: $0 [options]")
    .option("browser", {
        alias: "b",
        default: "chrome",
        description: "Browser: chrome, firefox",
    }).argv;


const run = async (options) => {
    ProtractorConfig.capabilities.browserName = options.browser;
    
    ProtractorLauncher.init(null, ProtractorConfig);
};

run(options);
