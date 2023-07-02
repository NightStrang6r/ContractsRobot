import variablesRemoveConfirm from '../keyboards/variablesRemoveConfirm.js';

async function onVariablesRemove(ctx) {
    const message = '❓ Are you sure you want to remove this document? All variables will be removed too.';
    await ctx.editMessageText(message, variablesRemoveConfirm());
}

export default onVariablesRemove;