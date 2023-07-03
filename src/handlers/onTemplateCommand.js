async function onTemplateCommand(ctx) {
    await ctx.replyWithDocument({ source: './assets/document_sample.docx' }, { caption: '📄 Sample template document' });
}

export default onTemplateCommand;