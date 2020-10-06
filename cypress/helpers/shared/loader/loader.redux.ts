import { createSlice } from '@reduxjs/toolkit';

export const mainLoader = createSlice({
    name: 'mainLoader',
    initialState: { isLoading: false },
    reducers: {
        show: (state) => {
            state.isLoading = true;
        },
        hide: (state) => {
            state.isLoading = false;
        }
    },

})
