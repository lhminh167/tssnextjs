import queryString from 'querystring';
import { get } from '../../shared/crud/crud.service';
import { productFilterUrl } from './product-filter.model';

export async function getFilter() {
    return await get(productFilterUrl.filter, 0);
}

export async function getProducts(input: queryString.ParsedUrlQueryInput) {
    return await get(productFilterUrl.product + '?' + queryString.stringify(input));
}
