import sendDocumentEditMessage from '../functions/sendDocumentEditMessage.js';

async function onVariablesRemoveCancel(ctx) {
    await ctx.deleteMessage();
    await sendDocumentEditMessage(ctx);
}

export default onVariablesRemoveCancel;