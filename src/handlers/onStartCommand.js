import mainKeyboard from '../keyboards/main.js';

const message = `<b>👋 Hey there!</b>

🔥 I\'m a <b>robot</b> that can help you to <b>manage your contracts</b>.
🟢 Just send me a <b>template document</b> in <i>docx</i> format with <b>specified variables</b>.
😻 Then I will ask you to fill them and <b>generate a new document</b>.
❓ For more information check /help.
`;

async function onStartCommand(ctx) {
    await ctx.replyWithSticker('CAACAgUAAxkBAAEVtxZknVfxClMeG2uU8_4HrP4LoR0f2AAC8QEAAt8fchmbLztCzXRCBS8E');
    await ctx.replyWithHTML(message, mainKeyboard());
}

export default onStartCommand;