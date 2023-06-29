import mainKeyboard from '../keyboards/main.js';

const message = `<b>❓ Help ❓</b>
Help info will be here...
`;

async function onHelpCommand(ctx) {
    let keyboard = mainKeyboard();

    await ctx.replyWithSticker('CAACAgUAAxkBAAEVtyJknVpeFyBAIASagY_JhKw8cwNYOgAC5gEAAt8fchnahA5qFSJrVC8E');
    await ctx.replyWithHTML(message, keyboard);
}

export default onHelpCommand;