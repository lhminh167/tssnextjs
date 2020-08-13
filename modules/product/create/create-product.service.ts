import { post } from '../../shared/crud/crud.service';
import { productFilterUrl } from '../filter/product-filter.model';
import { ICreateProductRequest } from './create-product.model';

export async function createProduct(input: ICreateProductRequest) {
    return await post(productFilterUrl.product, input);
}

