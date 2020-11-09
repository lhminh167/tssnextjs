import { PaginatedList } from "../../../../modules/shared/crud/crud.model";

export function paginateData(
    data: PaginatedList<any>,
    pageIndex: number,
    pageSize: number
) {

    const result = {
        ...data,
        items: data.items.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
        pageIndex,
        pageSize
    };

    return result;
}