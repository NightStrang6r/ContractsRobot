async function onVariablesRemoveConfirm(ctx) {
    ctx.deleteMessage();
    ctx.answerCbQuery('Document removed');
}

export default onVariablesRemoveConfirm;