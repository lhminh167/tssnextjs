import { createSlice } from 'redux-starter-kit';

export const mainLoader = createSlice({
    slice: 'mainLoader',
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
