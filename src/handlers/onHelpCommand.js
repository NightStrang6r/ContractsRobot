import mainKeyboard from '../keyboards/main.js';

const message = `<b>❓ Help ❓</b>

✔️ You can edit only 1 document at a time.
✔️ You can add up to 100 variables to a document.

🔸 Variables format: <b>{variable_name}</b>
`;

async function onHelpCommand(ctx) {
    let keyboard = mainKeyboard();

    await ctx.replyWithSticker('CAACAgUAAxkBAAEVtyJknVpeFyBAIASagY_JhKw8cwNYOgAC5gEAAt8fchnahA5qFSJrVC8E');
    await ctx.replyWithHTML(message, keyboard);
}

export default onHelpCommand;