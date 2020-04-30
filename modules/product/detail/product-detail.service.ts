import { get, remove } from '../../shared/crud/crud.service';
import { productFilterUrl } from '../filter/product-filter.model';
import { IProductRecommendationGetRequest } from '../../shared/models/product.model';
import querystring from 'query-string';

export async function getProduct(productId: number) {
    return await get(productFilterUrl.product, productId);
}

export async function getProductRecommendation(input: IProductRecommendationGetRequest) {
    return await get(productFilterUrl.recommendation(input.productId) + '?' + querystring.stringify(input), 0);
}

export async function removeProduct(productId: number) {
    return await remove(productFilterUrl.product, productId, null);
}
