import { put } from '../../shared/crud/crud.service';
import { apiProductUrl } from '../filter/product-filter.model';
import { IEditProductRequest } from './edit-product.model';
import { mediaUrl, ImageRenameRequest, IResponse } from '../../shared/crud/crud.model';
import { IProduct } from '../../shared/models/product.model';

export async function editProduct(input: IEditProductRequest): Promise<IResponse<IProduct>> {
    return await put(apiProductUrl.product, input.productId, input);
}

export async function renameImages(input: ImageRenameRequest[]) {
    return await put(mediaUrl.baseUrl, null, { content: input });
}
