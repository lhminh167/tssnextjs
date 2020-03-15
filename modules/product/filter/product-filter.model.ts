import { IState, PaginatedList, PaginationRequest, defaultPaginationRequest } from '../../shared/crud/crud.model';
import { IAttributeValue } from '../../shared/models/attribute-value.model';
import { ICategory } from '../../shared/models/category.model';
import { IProduct } from '../../shared/models/product.model';
import { SelectOption } from '../../shared/models/shared.model';

const productFilterBaseUrl = 'Product';

export const productFilterUrl = {
    filter: productFilterBaseUrl + '/' + 'Filter',
    choice: productFilterBaseUrl + '/' + 'Choice',
    recommendation: (productId: number) => `${productFilterBaseUrl}/${productId}/Recommendation`,
    product: productFilterBaseUrl
}

export enum ProductFilterFilterEnum {
    Size = 1,
    Color = 2,
}

export interface IProductFilterFilter {
    attributes: IAttributeValue[];
    categories: IProductFilterCategory[];
    minPrice: number;
    maxPrice: number;
}

export const filterInitialData: IProductFilterFilter = {
    attributes: [],
    categories: [],
    minPrice: 0,
    maxPrice: 100
};

export interface IProductFilterChoice {
    attributes: IAttributeValue[];
    categories: IAttributeValue[];
    minPrice: number;
    maxPrice: number;
}

export interface IProductFilterState {
    filter: IState<IProductFilterFilter>;
    product: IState<PaginatedList<IProduct>>;
    choice: IProductSearchRequest;
}

export class IProductFilterCategory {
    categoryId: number;
    name: string;
}

export const defaultProductFilterCategory = {
    categoryId: 0,
    name: ''
}


export interface IProductSearchRequest extends PaginationRequest {
    keyword: string;
    color: string;
    size: string;
    category: string[];
    minPrice: number;
    maxPrice: number;
}

export const defaultProductSearchRequest: IProductSearchRequest = {
    keyword: '',
    color: null,
    size: null,
    category: [],
    minPrice: 0,
    maxPrice: 0,
    isPagingEnabled: true,
    isDescending: true,
    pageIndex: 0,
    pageSize: 8,
    sortBy: null
}

export const defaultSortByOptions: SelectOption[] = [
    { label: 'None', value: 'None' },
    { label: 'Name', value: 'Name' },
    { label: 'Price', value: 'Price' },
    { label: 'Best Selling', value: 'BestSelling' },
    { label: 'Top Rated', value: 'TopRated' },
    { label: 'Most Discounted', value: 'MostDiscounted' },
    { label: 'Newest Arrivals', value: 'Newest' },
]

export const defaultIsDescendingOptions: SelectOption[] = [
    { label: 'Descending', value: true },
    { label: 'Ascending', value: false },
]