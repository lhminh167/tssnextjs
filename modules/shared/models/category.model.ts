import { PaginatedList, defaultPaginationList } from '../crud/crud.model';
import { IProduct } from './product.model';
import { toUrl } from '../helpers/string.helper';


const apiCategoryBaseUrl = 'category';

export const apiCategoryUrl = {
    category: apiCategoryBaseUrl,
};

export const categoryBaseUrl = '/category';

export const categoryUrl = {
    detail: (category: ICategory) => ({
        href: `${categoryBaseUrl}/[categoryName]/[categoryId]`,
        as: `${categoryBaseUrl}/${toUrl(category.name)}/${category.categoryId}`,
    }),
};

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