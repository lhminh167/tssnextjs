import { post } from '../../shared/crud/crud.service';
import { apiProductUrl } from '../filter/product-filter.model';
import { ICreateProductRequest } from './create-product.model';
import { Response } from '../../shared/crud/crud.model';
import { IProduct } from '../../shared/models/product.model';

export async function createProduct(input: ICreateProductRequest): Promise<Response<IProduct>> {
    return await post(apiProductUrl.product, input);
}

