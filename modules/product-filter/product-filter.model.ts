import { IState } from './../shared/crud/crud.model';
import { IAttributeValue } from '../shared/models/attribute-value.model';
import { ICategory } from './../shared/models/category.model';
import { IProduct } from './../shared/models/product.model';

const productFilterBaseUrl = '/ProductFilter';

export const productFilterUrl = {
    filter: productFilterBaseUrl + '/Filter',
    choice: productFilterBaseUrl + '/Choice',
    product: productFilterBaseUrl + '/Product'
}

export enum ProductFilterFilterEnum
{
    Size = 1,
    Color = 2,
}

export interface IProductFilterFilter {
    attributes: IAttributeValue[];
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
    product: IState<IProductFilterProduct[]>;
    choice: IProductFilterChoice;
}