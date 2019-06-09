import { Color } from "csstype";

export const colorPickerActionTypes = {
    CHOOSE_COLOR: 'CHOOSE_COLOR',
}

export function chooseColor(color: Color) {
    return {
        type: colorPickerActionTypes.CHOOSE_COLOR,
        payload: color
    }
};

export function colorPickerReducer(state = null, action) {

    if (action.type === colorPickerActionTypes.CHOOSE_COLOR)
        return action.payload;

    return state;

}
