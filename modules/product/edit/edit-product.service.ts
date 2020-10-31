import { put } from '../../shared/crud/crud.service';
import { apiProductUrl } from '../filter/product-filter.model';
import { IEditProductRequest } from './edit-product.model';
import { mediaUrl, ImageRenameRequest } from '../../shared/crud/crud.model';

export async function editProduct(input: IEditProductRequest) {
    return await put(apiProductUrl.product, input.productId, input);
}

export async function renameImages(input: ImageRenameRequest[]) {
    return await put(mediaUrl.baseUrl, null, { content: input });
}
