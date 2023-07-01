import variables from '../keyboards/variables.js';

async function onVariablesRemoveCancel(ctx) {
    const session = await global.bot.getSession(ctx);

    const message = `📄 <b>Document:</b> <i>${session.document.fileName}</i>
⭐ Click on the variable to fill it.
🔻 If you dont see all variables from the document, check /help.`;
    
    const keyboard = variables(session.document.variablesObjects);
    keyboard.parse_mode = 'HTML';

    await ctx.editMessageText(message, keyboard);
}

export default onVariablesRemoveCancel;