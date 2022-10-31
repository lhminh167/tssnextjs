import { defaultResponse } from "./crud.model";

export const crudInitialState = (initialData: any = []) => ({
  data: initialData,
  error: defaultResponse,
  isLoading: false,
});

export function paginatedInitialState(initialData: any = []) {
  return crudInitialState({
    items: initialData,
    isPagingEnabled: false,
    pageIndex: 0,
    pageSize: 0,
    totalPages: 0,
    count: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
}
