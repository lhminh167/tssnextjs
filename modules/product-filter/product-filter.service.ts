import { get } from '../shared/crud/crud.service';
import { productFilterUrl } from './product-filter.model';

export async function getFilter() {
    return await get(productFilterUrl.filter);
}

export async function getProduct() {
    return await get(productFilterUrl.product);
}

