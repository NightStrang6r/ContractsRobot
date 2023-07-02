async function onVariablesRemoveConfirm(ctx) {
    const session = await global.bot.getSession(ctx);
    session.document = null;

    await global.bot.saveSession(ctx, session);
    await ctx.deleteMessage();
    
    ctx.answerCbQuery('Document removed');
}

export default onVariablesRemoveConfirm;