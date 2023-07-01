import { Keyboard, Key } from 'telegram-keyboard';

function variables(arrayObjects) {
    let inlineArray = [];

    for (let i = 0; i < arrayObjects.length; i++) {
        inlineArray.push(
            [
                Key.callback(`✍️ ${arrayObjects[i].name}`, `variable_${arrayObjects[i].name}`)
            ]
        );
    }

    inlineArray.push([Key.callback('✅ Save ✅', `variables_save`), Key.callback('❌ Remove ❌', `variables_remove`)]);

    const keyboard = Keyboard.make(inlineArray).inline();
    return keyboard;
}

export default variables;