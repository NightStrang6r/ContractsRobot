import fetch from 'node-fetch';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { Buffer } from 'buffer';

import sendDocumentEditMessage from '../functions/sendDocumentEditMessage.js';

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

        const variables = getVariablesFromDocx(fileData);

        if (!variables) {
            await ctx.replyWithSticker('CAACAgUAAxkBAAEVt1JknWhCeUxgx87FDDfjepaj2oXcvgAC7QEAAt8fchlwAmkHffWfEC8E');
            await ctx.replyWithHTML('❌ File is empty or file format doesn\'t supported!');
            return;
        }

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
                variablesObjects: variablesObjects
            }
        };

        await global.bot.saveSession(ctx, sessionDocument);
        await ctx.telegram.deleteMessage(ctx.chat.id, processingMessage.message_id);
        await sendDocumentEditMessage(ctx);
    } catch (error) {
        console.error(`Failed to process the document: ${error}`);
        console.error(error.stack);
        await ctx.replyWithSticker('CAACAgUAAxkBAAEVt1JknWhCeUxgx87FDDfjepaj2oXcvgAC7QEAAt8fchlwAmkHffWfEC8E');
        await ctx.replyWithHTML('❌ Failed to process the document!');
    }
}

function getVariablesFromDocx(buffer) {
    const zip = new PizZip(buffer);
    const doc = new Docxtemplater().loadZip(zip);

    const usedTags = {};

    doc.setOptions({
        parser: tag => ({
            get: scope => {
                if (!usedTags.hasOwnProperty(tag)) {
                    usedTags[tag] = true;
                }
                return scope[tag] || null;
            }
        })
    });

    try {
        doc.render();
    } catch (error) {

    }

    return Object.keys(usedTags);
}

export default onDocument;