import { IState } from './../shared/crud/crud.model';
import { IAttributeValue } from '../shared/models/attribute-value.model';
import { ICategory } from './../shared/models/category.model';
import { IProduct } from './../shared/models/product.model';

const productFilterBaseUrl = 'ProductFilters/';

export const productFilterUrl = {
    filter: productFilterBaseUrl + 'Filters',
    choice: productFilterBaseUrl + 'Choice',
    product: productFilterBaseUrl + 'Product'
}

export interface IProps { }

export interface IState { }

export interface IProductFilterFilter {
    colors: IAttributeValue[];
    sizes: IAttributeValue[];
    categories: ICategory[];
}

export interface IProductFilterChoice {
    colorId: number;
    sizeId: number;
    categoryIds: number[];
    priceRange: IPriceRange;
}

export interface IPriceRange {
    minPrice: number;
    maxPrice: number;
}

export interface IProductFilterProduct extends IProduct {
    attributes: IAttributeValue[];
}

export interface IProductFilterState {
    filter: IState<IProductFilterFilter>;
    product: IState<IProductFilterProduct>;
    choice: IState<IProductFilterChoice>;
}