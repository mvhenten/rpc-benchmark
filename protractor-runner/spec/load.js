/* global browser, it, describe, by*/

describe("Benchmark", () => {
    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
    })
    
    it("run", async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
        await browser.get("http://localhost:5000");

        await browser.driver.wait(
            async () => (await browser.isElementPresent(by.css("#benchmark-complete"))),
            1200000
        );
        
        const results = await element(by.id("benchmark-results")).getText();
//        console.log(results);
    });
});
