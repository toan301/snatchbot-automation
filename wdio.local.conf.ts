import { config as sharedConfig } from "./wdio.shared.conf";

export const config: WebdriverIO.Config = {
    ...sharedConfig,
    ...{
        capabilities: [
            {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: [
                        "--window-size=1920,1080",
                        "--disable-gpu",
                        "--disable-dev-shm-usage",
                        "--ignore-ssl-errors",
                    ],
                },
            },
        ],
    },
};
