import c from "chalk";
import { Telegraf } from "telegraf";
import TelegrafLogger from "telegraf-logger";
import LocalSession from "telegraf-session-local";

import log from "./log.js";
import onMessage from "./handlers/onMessage.js";
import onCallbackQuery from "./handlers/onCallbackQuery.js";
import onStartCommand from "./handlers/onStartCommand.js";
import onInfoCommand from "./handlers/onInfoCommand.js";
import onHelpCommand from "./handlers/onHelpCommand.js";
import onUploadDocumentCommand from "./handlers/onUploadDocumentCommand.js";
import onEditCurrentDocumentCommand from "./handlers/onEditCurrentDocumentCommand.js";
import onTemplateCommand from "./handlers/onTemplateCommand.js";

class Bot {
    constructor(token) {
        this.bot = new Telegraf(token);
        this.localSession = new LocalSession();

        this.logger = new TelegrafLogger({
            log: log,
            format: '%ut => @%u %fn %ln (%fi): <%ust> %c',
            contentLength: 100,
        });

        global.localSession = this.localSession;
    }

    async start() {
        this.bot.use(this.logger.middleware());

        this.bot.start((ctx) => onStartCommand(ctx));
        this.bot.help((ctx) => onHelpCommand(ctx));

        this.bot.hears('📤 Upload document 📤', (ctx) => onUploadDocumentCommand(ctx));
        this.bot.hears('✍️ Edit current document ✍️', (ctx) => onEditCurrentDocumentCommand(ctx));
        this.bot.hears('❓ Help ❓', (ctx) => onHelpCommand(ctx));
        this.bot.hears('ℹ️ Info ℹ️', (ctx) => onInfoCommand(ctx));

        this.bot.command('template', (ctx) => onTemplateCommand(ctx));

        this.bot.on('message', (ctx) => onMessage(ctx));
        this.bot.on('callback_query',(ctx) => onCallbackQuery(ctx));

        this.bot.catch((err, ctx) => this.onError(err, ctx));

        try {
            this.bot.launch();
        } catch (err) {
            log('Error launching Telegram Bot.', 'r');
            console.log(err);
            return;
        }
        
        log('Telegram Bot launched.', 'g');
    }

    onError(err, ctx) {
        log(`Telegram Bot encountered an error for ${ctx.updateType}`, 'r');
        console.log(err);
    }

    getSessionKey(ctx) {
        if (ctx.from && ctx.chat) {
            return `${ctx.from.id}:${ctx.chat.id}`
        } else if (ctx.from && ctx.inlineQuery) {
            return `${ctx.from.id}:${ctx.from.id}`
        }
        return null
    }

    async getSession(ctx) {
        return await this.localSession.getSession(this.getSessionKey(ctx))
    }

    async saveSession(ctx, session) {
        return await this.localSession.saveSession(this.getSessionKey(ctx), session)
    }
}

export default Bot;