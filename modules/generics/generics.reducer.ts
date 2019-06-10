import { createSlice } from 'redux-starter-kit';
import { Action } from './generics.model';
import { baseInitialState } from './generics.state';

export function newSlice(
    slice: string,
    otherReducers = {},
    extraReducers = {},
    initialState = baseInitialState
) {

    const mainReducers = {
        getPending: (state) => {
            state.data = [];
            state.isLoading = true;
            state.error = null;
        },
        getSucceeded: (state, action: Action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        getFailed: (state, action) => {
            state.data = [];
            state.isLoading = false;
            state.error = action.payload;
        },
        getIdle: (state) => {
            state.data = [];
            state.isLoading = false;
            state.error = null;
        },
    }

    const reducers = {
        ...mainReducers,
        ...otherReducers
    }

    const newSlice = createSlice({
        slice,
        initialState,
        reducers,
        extraReducers
    })

    return newSlice;
}
