import { Keyboard } from 'telegram-keyboard';

function main() {
    const keyboard = Keyboard.make([
        ['📤 Upload document 📤', '✍️ Edit current document ✍️'],
        ['❓ Help ❓', 'ℹ️ Info ℹ️'],
    ]);

    return keyboard.reply();
}

export default main;