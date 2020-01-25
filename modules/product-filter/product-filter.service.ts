import { get } from '../shared/crud/crud.service';
import { productFilterUrl, IProductFilterFilter } from './product-filter.model';
import { IProduct } from '../shared/models/product.model';

export async function getFilter() {
    return await get(productFilterUrl.filter, 0);
}

export async function getProducts() {
    return await get(productFilterUrl.product, 0);
}
