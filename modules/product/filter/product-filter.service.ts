import queryString from 'querystring';
import { get } from '../../shared/crud/crud.service';
import { IProductSearchRequest, productFilterUrl } from './product-filter.model';

export async function getFilter() {
    return await get(productFilterUrl.filter, 0);
}

export async function getProducts(input: IProductSearchRequest) {
    return await get(productFilterUrl.product + '?' + queryString.stringify(input as any));
}

export async function getHomepageProducts() {
    return await get(productFilterUrl.homepage);
}