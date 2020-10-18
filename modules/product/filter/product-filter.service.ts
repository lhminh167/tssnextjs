import queryString from 'querystring';
import { get } from '../../shared/crud/crud.service';
import { IProductSearchRequest, apiProductUrl, IProductFilterFilter } from './product-filter.model';
import { IResponse } from '../../shared/crud/crud.model';
import { HomepageProducts } from '../../shared/models/product.model';

export async function getFilter(): Promise<IResponse<IProductFilterFilter>> {
    return await get(apiProductUrl.filter, 0);
}

export async function getProducts(input: IProductSearchRequest) {
    return await get(apiProductUrl.search(input));
}

export async function getHomepageProducts(): Promise<IResponse<HomepageProducts>> {
    return await get(apiProductUrl.homepage);
}