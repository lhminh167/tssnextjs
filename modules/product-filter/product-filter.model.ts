import { IState } from './../shared/crud/crud.model';
import { IAttributeValue } from '../shared/models/attribute-value.model';
import { ICategory } from './../shared/models/category.model';
import { IProduct } from './../shared/models/product.model';

const productFilterBaseUrl = 'Product';

export const productFilterUrl = {
    filter: productFilterBaseUrl + '/' + 'Filter',
    choice: productFilterBaseUrl + '/' + 'Choice',
    product: productFilterBaseUrl
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
    attributes: IAttributeValue[];
    categories: IAttributeValue[];
    minPrice: number;
    maxPrice: number;
}

export interface IProductFilterState {
    filter: IState<IProductFilterFilter>;
    product: IState<IProduct[]>;
    choice: IProductFilterChoice;
}