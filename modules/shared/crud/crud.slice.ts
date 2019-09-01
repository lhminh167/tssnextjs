import { createSlice } from 'redux-starter-kit';
import { IResponse, IState } from './crud.model';

export const crudInitialState = (initialData: any = []) => {
    return {
        data: initialData,
        error: null,
        isLoading: false,
    };
};

export const crudSlice = <T>(
    slice: string = 'default',
    initialData: any = [],
    otherReducers = {},
    extraReducers = {}
) => {

    const initialState = crudInitialState(initialData);

    const reducers = {
        ...mainReducers<T>(initialState),
        ...otherReducers
    };

    return createSlice({
        slice,
        initialState,
        reducers,
        extraReducers
    });
};

const mainReducers = <T>(initialState: IState<T>) => {
    return {
        getPending,
        getSucceeded,
        getFailed,
        getIdle: getIdle(initialState),
    }
}

const getPending = <T>(state: IState<T>) => {
    state.isLoading = true;
    state.error = null;
}

const getSucceeded = <T>(state: IState<T>, action: IResponse) => {
    state.data = action.payload;
    state.isLoading = false;
    state.error = null;
}

const getFailed = <T>(state: IState<T>, action: IResponse) => {
    state.isLoading = false;
    state.error = action;
}

const getIdle = <T>(initialState: IState<T>) => (state: IState<T>) => {
    state = initialState;
};