import mainKeyboard from '../keyboards/main.js';

const message = `<b>🔥 Contracts Robot 🔥</b>
<b>👉 Made with ♥ by <a href="https://t.me/NightStrang6r">NightStranger</a> (<a href="https://github.com/NightStrang6r">GitHub</a>)</b>
`;

async function onInfoCommand(ctx) {
    let keyboard = mainKeyboard();
    keyboard.disable_web_page_preview = true;

    await ctx.replyWithSticker('CAACAgUAAxkBAAEVtxhknVg8ysBE1Vc_HC39dhCchsTlYAACEgIAAt8fchmlt37X2a4PHi8E');
    await ctx.replyWithHTML(message, keyboard);
}

export default onInfoCommand;