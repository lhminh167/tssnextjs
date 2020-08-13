import { PaginatedList, defaultPaginationList } from "../crud/crud.model";
import { IProduct } from "./product.model";

export const categoryUrl = 'category';

export interface ICategory {
    categoryId: number;
    name: string;
    departmentId: number;
    description: string;
    product: PaginatedList<IProduct>
}

export const defaultCategory: ICategory = {
    categoryId: 0,
    name: '',
    departmentId: 0,
    description: '',
    product: defaultPaginationList
}