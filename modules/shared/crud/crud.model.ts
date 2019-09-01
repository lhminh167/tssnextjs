export const defaultOptions: IOptions = {
    withMainLoader: true,
    getSucceededMessage: '',
};

export interface IState<T> {
    data: any | T | T[];
    error: IResponse;
    isLoading: boolean;
}

export interface IOptions {
    withMainLoader: boolean,
    getSucceededMessage: string
}

export interface IRequest {
    input: RequestInfo,
    init?: RequestInit,
}

export interface IResponse
{
    status: number;
    type: string;
    title: string;
    detail: string;
    payload: any;
    instance: string;
    errors: any[];
}
