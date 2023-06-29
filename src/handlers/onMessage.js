import onStartCommand from "./onStartCommand.js";
import onDocument from "./onDocument.js";

async function onMessage(ctx) {
    if (ctx.message.document) {
        onDocument(ctx);
    } else {
        onStartCommand(ctx);
    }
}

export default onMessage;