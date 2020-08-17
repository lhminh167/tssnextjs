import queryString from 'querystring';
import { get } from '../../shared/crud/crud.service';
import { IProductSearchRequest, apiProductUrl } from './product-filter.model';

export async function getFilter() {
    return await get(apiProductUrl.filter, 0);
}

export async function getProducts(input: IProductSearchRequest) {
    return await get(apiProductUrl.product + '?' + queryString.stringify(input as any));
}

export async function getHomepageProducts() {
    return await get(apiProductUrl.homepage);
}