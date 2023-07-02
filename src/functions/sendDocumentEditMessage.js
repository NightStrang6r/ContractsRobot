import variablesKeyboard from '../keyboards/variables.js';

async function sendDocumentEditMessage(ctx) {
    const session = await global.bot.getSession(ctx);
    const sessionDocument = session.document;

    if (!session || !sessionDocument) {
        await ctx.replyWithSticker('CAACAgUAAxkBAAEVt1JknWhCeUxgx87FDDfjepaj2oXcvgAC7QEAAt8fchlwAmkHffWfEC8E');
        await ctx.replyWithHTML('❌ No document to edit. Add a new document first.');
        return;
    }

    if (!sessionDocument.variablesObjects || sessionDocument.variablesObjects.length == 0) {
        await ctx.replyWithSticker('CAACAgUAAxkBAAEVt1JknWhCeUxgx87FDDfjepaj2oXcvgAC7QEAAt8fchlwAmkHffWfEC8E');
        await ctx.replyWithHTML('❌ No variables to edit. Add some variables to a document first.');
        return;
    }

    const keyboard = variablesKeyboard(sessionDocument.variablesObjects);
    keyboard.parse_mode = 'HTML';

    const message = `📄 <b>Document:</b> <i>${sessionDocument.fileName}</i>
⭐ Click on the variable name to fill it.
🔻 If you dont see all variables from the document, check /help.`;

    await ctx.reply(message, keyboard);
}

export default sendDocumentEditMessage;