/*global browser, jasmine */

const Browsers = {
    ChromeExecutablePath: "/usr/bin/google-chrome-stable",
    ChromeDriverExecutablePath: __dirname + "/docker/chromedriver.sh",
    FirefoxExecutablePath: "/usr/bin/firefox",
    GeckoDriverExecutablePath: __dirname + "/docker/geckodriver.sh",
};


const promsifiy = require("util").promisify;
const path = require("path");
const ScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
const JasmineReporters = require("jasmine-reporters");
const touch = promsifiy(require("touch"));
const mkdirp = promsifiy(require("mkdirp"));
const docker = require("./lib/docker");
const testdir = __dirname + "/result";

const screenshotReporter = new ScreenshotReporter({
    dest: testdir,
    filename: "index.html",
    reportFailedUrl: true,
    cleanDestination: false,
    showQuickLinks: true,
    pathBuilder: function(currentSpec, suites, browserCapabilities) {
        return [
            new Date().toISOString(),
            currentSpec.status,
            currentSpec._suite.id,
            currentSpec._suite.fullName,
            currentSpec.id,
        ].join("-");
    },
});

const TerminalReporter = new JasmineReporters.TerminalReporter({
    verbosity: 3,
    showStack: true,
    color: process.stdin.isTTY,
});

exports.ProtractorConfig = {
    chromeDriver: Browsers.ChromeDriverExecutablePath,
    geckoDriver: Browsers.GeckoDriverExecutablePath,
    directConnect: true,
    specs: ["spec/**/*.js"],

    beforeLaunch: async () => {
        await docker.setup(path.join(__dirname, "docker"));
        await mkdirp(testdir);
        await touch(path.join(testdir, ".apollo-logfile-manager.disabled"));
    },

    onPrepare: () => {
        browser.waitForAngularEnabled(false);
        jasmine.getEnv().addReporter(screenshotReporter);
        jasmine.getEnv().addReporter(TerminalReporter);
        var width = 1024;
        var height = 768;
        browser.driver.manage().window().setSize(width, height);
    },
    capabilities: {
        browserName: "chrome",
        loggingPrefs: { "driver": "INFO", "browser": "INFO" },
        chromeOptions: {
            args: [
                "--headless",
                "--disable-gpu",
                "--window-size=800x600",
                "--remote-debugging-address=0.0.0.0",
                "--auth-negotiate-delegate-whitelist=*.amazon.com,amazon.com",
            ],
            binary: Browsers.ChromeExecutablePath,
        },
        "moz:firefoxOptions": {
            args: ["-headless"],
            binary: Browsers.FirefoxExecutablePath,
        },
    },
};
