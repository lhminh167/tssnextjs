import { createSlice } from 'redux-starter-kit';
import * as ICrudModule from './crud.model';

export function crudInitialState<T>(initialData: any = []) {
    return {
        data: initialData,
        error: null,
        isLoading: false
    }
}

export function crudSlice(
    slice: string,
    initialData: any = [],
    otherReducers = {},
    extraReducers = {}
) {

    const initialState = crudInitialState(initialData);

    const mainReducers = {
        getPending: (state) => {
            state.data = initialState.data;
            state.isLoading = true;
            state.error = null;
        },
        getSucceeded: (state, action) => {
            state.data = { ...initialState.data, ...action.payload };
            state.isLoading = false;
            state.error = null;
        },
        getFailed: (state, action) => {
            state.data = initialState.data;
            state.isLoading = false;
            state.error = action.payload;
        },
        getIdle: (state) => {
            state.data = initialState.data;
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
