import sendDocumentEditMessage from '../functions/sendDocumentEditMessage.js';

async function onEditCurrentDocumentCommand(ctx) {
    await sendDocumentEditMessage(ctx);
}

export default onEditCurrentDocumentCommand;