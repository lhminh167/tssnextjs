export const mainLoaderActionTypes = {
    SHOW: 'SHOW_MAIN_LOADER',
    HIDE: 'HIDE_MAIN_LOADER'
}

export function showMainLoader() {
    return {
        type: mainLoaderActionTypes.SHOW,
    }
};

export function hideMainLoader() {
    return {
        type: mainLoaderActionTypes.HIDE,
    }
}

export function loaderReducer(state = false, action) {

    if (action.type === mainLoaderActionTypes.SHOW)
        return true

    if (action.type === mainLoaderActionTypes.HIDE)
        return false

    return state;

}
