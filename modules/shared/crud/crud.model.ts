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

export interface IAction<T>
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
