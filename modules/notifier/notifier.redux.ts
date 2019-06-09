export function enqueueSnackbar(notification) {
    return {
        type: 'ENQUEUE_SNACKBAR',
        notification: {
            key: new Date().getTime() + Math.random(),
            ...notification,
        },
    }
};

export function removeSnackbar(key) {
    return {
        type: 'REMOVE_SNACKBAR',
        key,
    }
}

const defaultState = {
    notifications: [],
};

export function notifierReducer(state = defaultState, action) {
    switch (action.type) {
        case 'ENQUEUE_SNACKBAR':
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        ...action.notification,
                    },
                ],
            };

        case 'REMOVE_SNACKBAR':
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };

        default:
            return state;
    }

    
};
