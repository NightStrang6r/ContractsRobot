import fetch from 'node-fetch';
import JSZip from 'jszip';
import { Buffer } from 'buffer';

import variablesKeyboard from '../keyboards/variables.js';

async function onDocument(ctx) {
    if (!ctx.message?.document) {
        await ctx.replyWithSticker('CAACAgUAAxkBAAEVt1JknWhCeUxgx87FDDfjepaj2oXcvgAC7QEAAt8fchlwAmkHffWfEC8E');
        await ctx.replyWithHTML('❌ No document provided!');
        return;
    }

    const document = ctx.message.document;

    if (document.mime_type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        await ctx.replyWithSticker('CAACAgUAAxkBAAEVt1JknWhCeUxgx87FDDfjepaj2oXcvgAC7QEAAt8fchlwAmkHffWfEC8E');
        await ctx.replyWithHTML('❌ Only docx files are supported!');
        return;
    }

    const processingMessage = await ctx.replyWithHTML('⏳ Processing document...');

    try {
        const fileId = document.file_id;
        const fileLink = await ctx.telegram.getFileLink(fileId);
        
        const response = await fetch(fileLink.href);
        const arrayBuffer = await response.arrayBuffer();
        const fileData = Buffer.from(arrayBuffer);

        const documentXml = await extractDocumentXml(fileData);

        if (!documentXml) {
            await ctx.replyWithSticker('CAACAgUAAxkBAAEVt1JknWhCeUxgx87FDDfjepaj2oXcvgAC7QEAAt8fchlwAmkHffWfEC8E');
            await ctx.replyWithHTML('❌ File is empty or file format doesn\'t supported!');
            return;
        }

        const variables = getVariablesFromString(documentXml);
        const variablesObjects = [];

        for (let i = 0; i < variables.length; i++) {
            variablesObjects.push({
                name: variables[i],
                value: null
            });
        }

        let sessionDocument = {
            document: {
                fileId: fileId,
                fileName: document.file_name,
                fileLink: fileLink.href,
                documentXml: documentXml,
                variablesObjects: variablesObjects
            }
        };

        await global.bot.saveSession(ctx, sessionDocument);

        const keyboard = variablesKeyboard(variablesObjects);
        keyboard.parse_mode = 'HTML';

        const message = `📄 <b>Document:</b> <i>${document.file_name}</i>
⭐ Click on the variable to fill it.
🔻 If you dont see all variables from the document, check /help.`;

        await ctx.telegram.editMessageText(ctx.chat.id, processingMessage.message_id, null, message, keyboard);
    } catch (error) {
        console.error(`Failed to download the document: ${error}`);
    }
}

async function extractDocumentXml(fileData) {
    const zip = new JSZip();
    const docxZip = await zip.loadAsync(fileData);
    const documentXmlFile = docxZip.file('word/document.xml');

    if (!documentXmlFile) {
        return null;
    }

    const documentXmlData = await documentXmlFile.async('string');
    return documentXmlData;
}

function getVariablesFromString(string) {
    const regex = /\$\{(.+?)\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(string)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}

export default onDocument;