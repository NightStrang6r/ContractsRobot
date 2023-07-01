import onStartCommand from "./onStartCommand.js";
import onDocument from "./onDocument.js";
import onVariableNewValue from "./onVariableNewValue.js";

async function onMessage(ctx) {
    const session = await global.bot.getSession(ctx);

    if (ctx.message.document) {
        onDocument(ctx);
    } else if (session && session.document && session.document.editingVariable != null) {
        onVariableNewValue(ctx);
    } else  {
        onStartCommand(ctx);
    }
}

export default onMessage;