import homeKeyboard from '../keyboards/home.js';

const message = `✳️ Ok, send me a document in docx format with specified variables.`;

async function onUploadDocumentCommand(ctx) {
    await ctx.replyWithSticker('CAACAgUAAxkBAAEVt4tknXEvDLXMCuIMsf6edpzOszIFDAAC3gEAAt8fchlo2OXogfpU1y8E');
    await ctx.replyWithHTML(message, homeKeyboard());
}

export default onUploadDocumentCommand;