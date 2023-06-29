import mainKeyboard from '../keyboards/main.js';

const message = `<b>👋 Hey there!</b>

🔥 I\'m a robot that can help you to manage your contracts.
🟢 Just send me a document in docx format with specified variables.
😻 Then I will ask you to fill them and generate a new document.
`;

async function onStartCommand(ctx) {
    await ctx.replyWithSticker('CAACAgUAAxkBAAEVtxZknVfxClMeG2uU8_4HrP4LoR0f2AAC8QEAAt8fchmbLztCzXRCBS8E');
    await ctx.replyWithHTML(message, mainKeyboard());
}

export default onStartCommand;