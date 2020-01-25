import { createSlice } from '@reduxjs/toolkit';

export const notifier = createSlice({
    name: 'notifier',
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
            // state.notifications.filter(
            //     notification => notification.key !== action.key
            // )
        }
    },

})
