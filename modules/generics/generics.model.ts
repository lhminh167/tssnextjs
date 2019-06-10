export interface NewSlice {
    slice: string;
    reducers: any;
    actions: SliceActions;
    selectors: any;
}


export interface SliceActions {
    getPending(): Action;
    getSucceeded(payload: any): Action,
    getFailed(payload: any): Action;
    getIdle(): Action;
}

export interface Action {
    type: string;
    payload: any;
}

export interface Options {
    withMainLoader: boolean,
    withNotifier: boolean,
    getSucceededMessage: string
}

export const defaultOptions = { 
    withMainLoader: true, 
    withNotifier: true,
    getSucceededMessage: ''
};