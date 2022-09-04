import BasePage from "./base.page";

export default class ChatBot extends BasePage {
    /**
     * define elements
     */
    get chatBotIcon() {
        return $("div#sntch_button");
    }
    get chatBotIframe() {
        return $("#sntch_iframe");
    }
    get chatBotInput() {
        return $("input#chat_input");
    }
    get sendMessageButton() {
        return $("button[data-test='btn-send-message']");
    }
    get botReplyMessage() {
        return $$("div[data-test='message-text']");
    }
    get botTypingMessage() {
        return $(".message__typing");
    }
    get botAnswerOptionButton() {
        return $("button[data-test='message-suggested-btn']=Yes");
    }

    /**
     * define or overwrite page methods
     */

    async visitPage() {
        await this.open("/");
    }

    async openTheChatBot() {
        await this.chatBotIcon.waitForDisplayed();
        await this.chatBotIcon.click();
        await browser.switchToFrame(await this.chatBotIframe);
    }

    async inputTheQuestion(question: string) {
        console.log(`Input The Question ${question}`);
        await this.chatBotInput.waitForEnabled();
        await this.chatBotInput.setValue(question);
    }

    async setName(name: string) {
        console.log(`Set Answer Name ${name}`);
        await this.inputTheQuestion(name);
        await this.sendMessage();
        await this.botAnswerOptionButton.click();
    }
    async sendMessage() {
        console.log(`Send Message`);
        await this.sendMessageButton.waitForClickable();
        await this.sendMessageButton.click();
    }

    async getLatestBotAnswer(question: string) {
        console.log(`Get Latest Answer`);
        const botLatestAnswerLocator = await $(
            `//p[contains(.,'${question}')]/../../../../following-sibling::div/div[@class='message__wrapper']//div[@data-test='message-text']`
        );
        await (await this.botTypingMessage).waitForDisplayed({ reverse: true });
        await botLatestAnswerLocator.waitForDisplayed();
        let answerList: string[] = [];
        await this.botReplyMessage.map(async (elm) => {
            const msg = await elm.getText();
            answerList.push(msg);
        });
        let index = answerList.indexOf(question);
        if (index > -1) {
            answerList.splice(0, index - 1);
        } else {
            console.log("Check your question");
        }
        console.log(answerList);
        return answerList;
    }
}
