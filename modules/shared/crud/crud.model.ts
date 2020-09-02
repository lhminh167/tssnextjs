export interface IState<T> {
  data: T;
  error: IResponse<T>;
  isLoading: boolean;
}

export interface PaginatedList<T> {
  items: T[];
  isPagingEnabled: boolean;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  count: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const defaultPaginationList: PaginatedList<any> = {
  items: [],
  isPagingEnabled: false,
  pageIndex: 0,
  pageSize: 0,
  totalPages: 0,
  count: 0,
  hasPreviousPage: false,
  hasNextPage: false
};

export interface PaginationRequest {
  isPagingEnabled?: boolean;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  isDescending?: boolean;
}

export const defaultPaginationRequest: PaginationRequest = {
  isPagingEnabled: false,
  pageIndex: 0,
  pageSize: 0,
  sortBy: null,
  // isDescending: null,
  isDescending: true
};

export const defaultRowsPerPageOptions: number[] = [8, 16, 32];

export interface IResponse<T> {
  content?: T;
  status?: number;
  type?: string;
  title?: string;
  detail?: string;
  instance?: string;
  errors?: any[];
}

export class Response<T> implements IResponse<T> {
  constructor(
    content?: T,
    status?: number,
    title?: string,
    type?: string,
    detail?: string,
    instance?: string,
    errors?: any[]
  ) {
    this.content = content;
    this.status = status;
    this.type = type;
    this.title = title;
    this.detail = detail;
    this.instance = instance;
    this.errors = errors;
  }

  content?: T;
  status?: number;
  type?: string;
  title?: string;
  detail?: string;
  instance?: string;
  errors?: any[];
}

export interface PayloadAction<T> {
  type?: string;
  payload: IResponse<T>;
}

export enum HttpMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  OPTIONS = 'OPTIONS',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

export interface UploadRequest {
  name: string;
  file: Blob;
}

export interface ImageGetUploadTokenRequest {
  name: string;
  settings: string;
}

export interface ImageGetUploadTokensRequest {
  content: ImageGetUploadTokenRequest[];
}

export interface ImageRenameRequest {
  oldName: string;
  newName: string;
}

export interface ImagesRenameRequest {
  content: ImageRenameRequest[];
}

const mediaBaseUrl = 'Media';

export const mediaUrl = {
  imageUploadToken: mediaBaseUrl + '/' + 'ImageUploadToken',
  baseUrl: mediaBaseUrl
};
