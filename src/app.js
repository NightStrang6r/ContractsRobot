import c from 'chalk';
import Bot from './telegram.js';
import constants from './constants.js';
import fs from 'fs';

class App {
    async run() {
        console.log(c.cyan(`ContractsRobot v${constants.version} by NightStranger\n`));
        const settings = this.loadSettings();

        if (!settings) {
            return;
        }

        const bot = new Bot(settings.token);
        await bot.start();
    }

    loadSettings() {
        try {
            const settings = fs.readFileSync('./settings.json', 'utf8');

            return JSON.parse(settings);
        } catch (e) {
            console.log(c.red('Error loading settings file.'));
            console.log(c.red(e));
            return null;
        }
    }
}

export default App;