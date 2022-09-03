import BaseAction from "../common/base.action";

export default class BasePage extends BaseAction {
    open(path: string) {
        return browser.url(path);
    }
}
