import { get } from '../shared/crud/crud.service';
import { productFilterUrl } from '../product-filter/product-filter.model';

export async function getProduct(productId: number) {
    return await get(productFilterUrl.product, productId);
}

