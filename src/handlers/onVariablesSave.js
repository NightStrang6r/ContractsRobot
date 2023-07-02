import fetch from 'node-fetch';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { Buffer } from 'buffer';

async function onVariablesSave(ctx) {
    const savingMessage = await ctx.replyWithHTML('⏳ Saving document...');

    try {
        const session = await global.bot.getSession(ctx);
        const sessionDocument = session.document;

        const variablesObjects = sessionDocument.variablesObjects;
        const fileLink = sessionDocument.fileLink;

        const response = await fetch(fileLink);
        const arrayBuffer = await response.arrayBuffer();
        const fileData = Buffer.from(arrayBuffer);

        const replaceObject = variablesObjects.reduce((accumulator, item) => {
            if(item.value === "" || item.value === null || item.value === undefined) {
              accumulator[item.name] = item.name;
            } else {
              accumulator[item.name] = item.value;
            }
            return accumulator;
        }, {});

        const newFileData = replaceVariables(fileData, replaceObject);

        const message = await ctx.telegram.sendDocument(ctx.from.id, { 
            source: newFileData,
            filename: sessionDocument.fileName
        }, {
            caption: '<b>✅ Document saved!</b>',
            parse_mode: 'HTML'
        });

        await ctx.telegram.deleteMessage(ctx.chat.id, savingMessage.message_id);
    } catch (err) {
        console.error(err);
        await ctx.telegram.deleteMessage(ctx.chat.id, savingMessage.message_id);
        await ctx.replyWithSticker('CAACAgUAAxkBAAEVt1JknWhCeUxgx87FDDfjepaj2oXcvgAC7QEAAt8fchlwAmkHffWfEC8E');
        await ctx.replyWithHTML('❌ An error occurred while saving document!');
    }
}

function replaceVariables(fileData, replaceObject) {
    const zip = new PizZip(fileData);
    const docx = new Docxtemplater(zip);

    docx.setData(replaceObject);
    docx.render();

    return docx.getZip().generate({ type: 'nodebuffer' });
}

export default onVariablesSave;