async function onVariableNewValue(ctx) {
    const session = await global.bot.getSession(ctx);

    const variablesObjects = session.document.variablesObjects;

    for (const variable of variablesObjects) {
        if (variable.name == session.document.editingVariable) {
            variable.value = ctx.message.text;
            break;
        }
    }

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

    let message = '✅ <b>Variable saved!</b>';

    await ctx.replyWithHTML(message);
}

export default onVariableNewValue;