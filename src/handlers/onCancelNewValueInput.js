async function onCancelNewValueInput(ctx) {
    const session = await global.bot.getSession(ctx);
    const variablesObjects = session.document.variablesObjects;

    await global.bot.saveSession(ctx, {
        document: {
            fileId: session.document.fileId,
            fileName: session.document.fileName,
            fileLink: session.document.fileLink,
            documentXml: session.document.documentXml,
            variablesObjects: variablesObjects,
            editingVariable: null
        }
    });

    await ctx.deleteMessage();
    await ctx.answerCbQuery('Input canceled');
}

export default onCancelNewValueInput;