async function onCallbackQuery(ctx) {
    const callbackData = ctx.update.callback_query.data;
    
    ctx.answerCbQuery('Callback');
}

export default onCallbackQuery;