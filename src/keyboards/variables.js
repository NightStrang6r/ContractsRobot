import { Keyboard, Key } from 'telegram-keyboard';

function variables(array) {
    let inlineArray = [];

    for (let i = 0; i < array.length; i++) {
        inlineArray.push(
            [
                Key.callback(array[i], `variable_${array[i]}`)
            ]
        );
    }

    const keyboard = Keyboard.make(inlineArray).inline();
    return keyboard;
}

export default variables;