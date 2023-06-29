import { Keyboard } from 'telegram-keyboard';

function home() {
    const keyboard = Keyboard.make([
        ['🏠 Home page 🏠'],
    ]);

    return keyboard.reply();
}

export default home;