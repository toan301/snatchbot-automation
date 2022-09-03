import ChatBot from "../pageobjects/chatbot.page";
import testData from "../data/testData.json";

describe("Chatbot", () => {
    testData.forEach((element) => {
        it(`input the question ${element.question}`, async () => {
            const question = element.question;
            const answer = element.answer;
            const chatBot = new ChatBot();
            await chatBot.visitPage();
            await chatBot.openTheChatBot();
            await chatBot.setName("Toan Tran");
            await chatBot.inputTheQuestion(question);
            await chatBot.sendMessage();
            const chatBotAnswer = await chatBot.getLatestBotAnswer(question);
            expect(chatBotAnswer).toContain(answer);
        });
    });
});
