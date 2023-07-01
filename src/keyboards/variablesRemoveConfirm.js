import { Keyboard, Key } from 'telegram-keyboard';

function variablesRemoveConfirm() {
    const keyboard = Keyboard.make([
        [
            Key.callback('✅ Yes, remove it ✅', `variables_remove_confirm`), 
            Key.callback('❌ No, cancel ❌', `variables_remove_cancel`)
        ]
    ]).inline();
    return keyboard;
}

export default variablesRemoveConfirm;