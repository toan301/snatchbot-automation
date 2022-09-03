export default class BaseAction {
    timeout = 20000;

    async isElementDisplayed(element: WebdriverIO.Element) {
        try {
            await this.sleep(1);
            return element.isDisplayed();
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async isElementEnabled(element: WebdriverIO.Element) {
        try {
            await this.sleep(1);
            return element.isEnabled();
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async isElementExisting(element: WebdriverIO.Element) {
        try {
            await this.sleep(1);
            return element.isExisting();
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async waitPageLoaded() {
        browser.waitUntil(
            async () => {
                const state = browser.execute(() => document.readyState);
                console.log("state:" + state);
                return (await state) === "complete";
            },
            {
                timeout: 60000,
                timeoutMsg: "Oops! Check your internet connection",
            }
        );
    }

    async sleep(s: number) {
        await browser.pause(s * 1000);
    }

    async createNewWindow() {
        browser.createWindow("tab");
    }
}
