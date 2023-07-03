import mainKeyboard from '../keyboards/main.js';

const message = `<b>❓ Help ❓</b>

🔸 Variables format: <b>{variable_name}</b>
🔸 Download sample template: <b>/template</b>

✔️ You can edit only <b>1 document</b> at a time.
✔️ You can add up to <b>100 variables</b> to a document.

💯 <b>100% private and open source</b>
`;

async function onHelpCommand(ctx) {
    let keyboard = mainKeyboard();

    await ctx.replyWithSticker('CAACAgUAAxkBAAEVtyJknVpeFyBAIASagY_JhKw8cwNYOgAC5gEAAt8fchnahA5qFSJrVC8E');
    await ctx.replyWithHTML(message, keyboard);
}

export default onHelpCommand;