import cancelNewValueInputKeyboard from '../keyboards/cancelNewValueInput.js';

async function onVariableEdit(ctx) {
    const callbackData = ctx.update.callback_query.data;
    const variableName = callbackData.replace('variable_', '');

    const sessionDocument = await global.bot.getSession(ctx);

    const variablesObjects = sessionDocument.document.variablesObjects;

    let variableObject = null;

    for (let i = 0; i < variablesObjects.length; i++) {
        if (variablesObjects[i].name == variableName) {
            variableObject = variablesObjects[i];
            break;
        }
    }

    if (!variableObject) {
        await ctx.replyWithSticker('CAACAgUAAxkBAAEVt1JknWhCeUxgx87FDDfjepaj2oXcvgAC7QEAAt8fchlwAmkHffWfEC8E');
        await ctx.replyWithHTML('❌ Variable not found!');
        return;
    }

    let message = '✏️ <b>Variable:</b> ' + variableObject.name + '\n\n';

    if (variableObject.value) {
        message += '<b>Value:</b> ' + variableObject.value + '\n\n';
    }

    await global.bot.saveSession(ctx, {
        document: {
            fileId: sessionDocument.document.fileId,
            fileName: sessionDocument.document.fileName,
            fileLink: sessionDocument.document.fileLink,
            documentXml: sessionDocument.document.documentXml,
            variablesObjects: variablesObjects,
            editingVariable: variableObject.name
        }
    });

    message += 'Send new value:';

    await ctx.replyWithHTML(message, cancelNewValueInputKeyboard());
}

export default onVariableEdit;