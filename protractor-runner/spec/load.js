/* global browser, it, describe, by*/

describe("Benchmark", () => {
    it("run", async () => {
        await browser.get("http://localhost:5000");

        await browser.driver.wait(
            async () => (await browser.isElementPresent(by.css("#benchmark-complete"))),
            10000
        );
        
        console.log("hello");
    });
});
