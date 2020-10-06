import { get, remove } from '../../shared/crud/crud.service';
import { apiProductUrl } from '../filter/product-filter.model';
import { IProductRecommendationGetRequest, IProduct } from '../../shared/models/product.model';
import querystring from 'query-string';
import { Response } from '../../shared/crud/crud.model';

export async function getProduct(productId: number): Promise<Response<IProduct>> {
    return await get(apiProductUrl.product, productId);
}

export async function getProductRecommendation(input: IProductRecommendationGetRequest) {
    return await get(apiProductUrl.recommendation(input.productId) + '?' + querystring.stringify(input), 0);
}

export async function removeProduct(productId: number) {
    return await remove(apiProductUrl.product, productId, null);
}
