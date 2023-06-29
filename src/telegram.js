import c from "chalk";
import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";

import onMessage from "./handlers/onMessage.js";
import onCallbackQuery from "./handlers/onCallbackQuery.js";
import onStartCommand from "./handlers/onStartCommand.js";
import onInfoCommand from "./handlers/onInfoCommand.js";
import onHelpCommand from "./handlers/onHelpCommand.js";
import onUploadDocumentCommand from "./handlers/onUploadDocumentCommand.js";

class Bot {
    constructor(token) {
        this.bot = new Telegraf(token);
    }

    async start() {
        this.bot.use((new LocalSession({ database: 'example_db.json' })).middleware());

        this.bot.start((ctx) => onStartCommand(ctx));
        this.bot.help((ctx) => onHelpCommand(ctx));

        this.bot.hears('📤 Upload document 📤', (ctx) => onUploadDocumentCommand(ctx));
        this.bot.hears('❓ Help ❓', (ctx) => onHelpCommand(ctx));
        this.bot.hears('ℹ️ Info ℹ️', (ctx) => onInfoCommand(ctx));

        this.bot.on('message', (ctx) => onMessage(ctx));
        this.bot.on('callback_query',(ctx) => onCallbackQuery(ctx));

        this.bot.catch((err, ctx) => this.onError(err, ctx));

        try {
            this.bot.launch();
        } catch (err) {
            console.log(c.red('Error launching Telegram Bot.'));
            console.log(c.red(err));
            return;
        }
        
        console.log(c.green('Telegram Bot launched.'));
    }

    onError(err, ctx) {
        console.log(`Telegram Bot encountered an error for ${ctx.updateType}`, err);
    }
}

export default Bot;