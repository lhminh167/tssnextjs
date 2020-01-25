export interface IState<T> {
    data: T;
    error: IResponse<T>;
    isLoading: boolean;
}

export interface IResponse<T>
{
    status?: number;
    type?: string;
    title?: string;
    detail?: string;
    content?: T;
    instance?: string;
    errors?: any[];
}

export class Response<T> implements IResponse<T>
{
    constructor(content: T){
        this.content = content;
    }

    content?: T;
}


export interface PayloadAction<T>
{
    type?: string;
    payload: IResponse<T>;
}

export enum HttpMethod
{
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    POST = 'POST',
    OPTIONS = 'OPTIONS',
    PUT = 'PUT',
    PATCH = 'PATCH',
}
