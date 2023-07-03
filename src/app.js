import c from 'chalk';
import log from './log.js';
import Bot from './telegram.js';
import constants from './constants.js';
import fs from 'fs';

class App {
    async run() {
        console.log(c.cyan(`ContractsRobot v${constants.version} by NightStranger\n`));
        process.on('uncaughtException', err => this.onUncaughtException(err));

        const settings = this.loadSettings();

        if (!settings) {
            return;
        }

        const bot = new Bot(settings.token);
        global.bot = bot;
        await bot.start();
    }

    loadSettings() {
        try {
            const settings = fs.readFileSync('./settings.json', 'utf8');

            return JSON.parse(settings);
        } catch (e) {
            log('Error loading settings file.', 'r');
            console.log(e);
            return null;
        }
    }

    onUncaughtException(err) {
        console.error('Caught exception: ', err);
        console.error(err.stack);
    }
}

export default App;