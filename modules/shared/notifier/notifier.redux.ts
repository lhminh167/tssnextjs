import { createSlice } from 'redux-starter-kit';

export const notifier = createSlice({
    slice: 'notifier',
    initialState: {
        notifications: []
    },
    reducers: {
        enqueue: (state, action) => {
            state.notifications.push({
                key: new Date().getTime() + Math.random(),
                ...action.payload
            });
        },
        remove: (state, action) => {
            state.notifications.filter(
                notification => notification.key !== action.key
            )
        }
    },

})
