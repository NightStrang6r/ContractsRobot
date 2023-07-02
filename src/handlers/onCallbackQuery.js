import onVariablesRemove from "./onVariablesRemove.js";
import onVariablesRemoveConfirm from "./onVariablesRemoveConfirm.js";
import onVariablesRemoveCancel from "./onVariablesRemoveCancel.js";
import onVariableEdit from "./onVariableEdit.js";
import onCancelNewValueInput from "./onCancelNewValueInput.js";
import onVariablesSave from "./onVariablesSave.js";

async function onCallbackQuery(ctx) {
    const callbackData = ctx.update.callback_query.data;
    
    if (callbackData == 'variables_save') {
        onVariablesSave(ctx);
    } else if (callbackData == 'variables_remove') {
        onVariablesRemove(ctx);
    } else if (callbackData == 'variables_remove_cancel') {
        onVariablesRemoveCancel(ctx);
    } else if (callbackData == 'variables_remove_confirm') {
        onVariablesRemoveConfirm(ctx);
    } else if (callbackData.startsWith('variable_')) {
        onVariableEdit(ctx);
    } else if (callbackData == 'cancel_new_value_input') {
        onCancelNewValueInput(ctx);
    }

    ctx.answerCbQuery();
}

export default onCallbackQuery;