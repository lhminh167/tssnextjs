/**
 * The latest version of tssnetcore backend API that is compatible with this frontend version
 */
export const backendApiVersion = "v1.0.5";

export interface IState<T> {
  // #region Properties (3)

  data: T;
  error: IResponse<T>;
  isLoading: boolean;

  // #endregion Properties (3)
}

export interface PaginatedList<T> {
  // #region Properties (8)

  count: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isPagingEnabled: boolean;
  items: T[];
  pageIndex: number;
  pageSize: number;
  totalPages: number;

  // #endregion Properties (8)
}

export const defaultPaginationList: PaginatedList<any> = {
  items: [],
  isPagingEnabled: false,
  pageIndex: 0,
  pageSize: 0,
  totalPages: 0,
  count: 0,
  hasPreviousPage: false,
  hasNextPage: false,
};

export interface PaginationRequest {
  // #region Properties (5)

  isDescending: boolean;
  isPagingEnabled: boolean;
  pageIndex: number;
  pageSize: number;
  sortBy: string;

  // #endregion Properties (5)
}

export const defaultPaginationRequest: PaginationRequest = {
  isPagingEnabled: false,
  pageIndex: 0,
  pageSize: 0,
  sortBy: "",
  // isDescending: null,
  isDescending: true,
};

export const defaultRowsPerPageOptions: number[] = [8, 16, 32];

export interface IResponse<T> {
  // #region Properties (7)

  content: T;
  detail: string;
  errors: any[];
  instance: string;
  status: number;
  title: string;
  type: string;

  // #endregion Properties (7)
}

export const defaultResponse: IResponse<any> = {
  content: {},
  detail: "",
  errors: [],
  instance: "",
  status: 200,
  title: "",
  type: "",
};

export interface PayloadAction<T> {
  // #region Properties (2)

  payload: IResponse<T>;
  type: string;

  // #endregion Properties (2)
}

export enum HttpMethod {
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  POST = "POST",
  OPTIONS = "OPTIONS",
  PUT = "PUT",
  PATCH = "PATCH",
}

export interface UploadRequest {
  // #region Properties (2)

  file: Blob;
  name: string;

  // #endregion Properties (2)
}

export interface ImageGetUploadTokenRequest {
  // #region Properties (2)

  name: string;
  settings: string;

  // #endregion Properties (2)
}

export interface ImageGetUploadTokensRequest {
  // #region Properties (1)

  content: ImageGetUploadTokenRequest[];

  // #endregion Properties (1)
}

export interface ImageRenameRequest {
  // #region Properties (2)

  newName: string;
  oldName: string;

  // #endregion Properties (2)
}

export interface ImagesRenameRequest {
  // #region Properties (1)

  content: ImageRenameRequest[];

  // #endregion Properties (1)
}

const mediaBaseUrl = "Media";

export const mediaUrl = {
  imageUploadToken: mediaBaseUrl + "/" + "ImageUploadToken",
  baseUrl: mediaBaseUrl,
};
