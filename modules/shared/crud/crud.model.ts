import { PutEffectDescriptor, SimpleEffect, ForkEffectDescriptor } from "redux-saga/effects";

export interface IState<T> {
    data: any | T | T[];
    error: any;
    isLoading: boolean;
}

export interface ISlice<T> {
    slice: string;
    reducers: IMainReducers<T>;
    actions: IActions<T>;
    selectors: any;
}

export interface IMainReducers<T> {
    getPending: (state: IState<T>) => void;
    getSucceeded: (state: IState<T>, action: IActions<T>) => void;
    getFailed: (state: IState<T>, action: IActions<T>) => void;
    getIdle: (state: IState<T>) => void;
}

export interface IActions<T> {
    getPending(): IGetPendingAction<T>,
    getSucceeded(payload: any): IAction<T>,
    getFailed(payload: any): IAction<T>,
    getIdle(): IAction<T>,
}

export interface IAction<T> {
    type: string;
    payload: any | T | T[];
}

export interface IGetPendingAction<T> extends IAction<T> {
    payload: string
}

export interface IOptions {
    withMainLoader: boolean,
    getSucceededMessage: string
}

export const defaultOptions: IOptions = {
    withMainLoader: true,
    getSucceededMessage: '',
};

export interface IRequest {
    input: RequestInfo,
    init?: RequestInit,
}

export type IWatcher = IterableIterator<SimpleEffect<"FORK", ForkEffectDescriptor>>[]

export interface IWorker<T> {
    get: (action: IGetPendingAction<T>) => IterableIterator<Promise<any> | SimpleEffect<"PUT", PutEffectDescriptor<any>>>;
}

export type createInitialState<T> = (initialData: T) => IState<T>;
