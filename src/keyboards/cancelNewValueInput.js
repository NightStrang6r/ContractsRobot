import { Keyboard, Key } from 'telegram-keyboard';

function cancelNewValueInput() {
    const keyboard = Keyboard.make([
        [Key.callback('❌ Cancel ❌', 'cancel_new_value_input')]
    ]).inline();

    return keyboard;
}

export default cancelNewValueInput;