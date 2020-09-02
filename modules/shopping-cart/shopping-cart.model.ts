import { defaultProduct, IProduct } from '../shared/models/product.model';
import { PaginationRequest, defaultPaginationRequest, PaginatedList, defaultPaginationList } from '../shared/crud/crud.model';
import querystring from 'query-string';

const shoppingCartBaseUrl = 'shoppingCart';

export const apiShoppingCartUrl = {
    baseUrl: shoppingCartBaseUrl,
    saveItemForLater: shoppingCartBaseUrl + '/' + 'saveItemForLater',
    moveItemToCart: shoppingCartBaseUrl + '/' + 'MoveItemToCart',
    totalCost: shoppingCartBaseUrl + '/' + 'TotalCost',
    totalQuantity: (buyNow: boolean) => shoppingCartBaseUrl + '/TotalQuantity?buyNow=' + buyNow,
    shoppingCart: (input: ShopingCartGetRequest) => shoppingCartBaseUrl + '?' +
        querystring.stringify(input),
    wishList: `${shoppingCartBaseUrl}?buyNow=false`,
    recommendation: `${shoppingCartBaseUrl}/Recommendation`,
}

export interface IShopingCartItem {
    itemId?: number;
    productId?: number;
    attributes?: string;
    quantity?: number;
    buyNow?: boolean;
    name?: string;
    price?: number;
    image?: string;
    discountedPrice?: number;
    product?: IProduct;
}

export const defaultShoppingCartItem: IShopingCartItem = {
    itemId: 0,
    productId: 0,
    attributes: '',
    quantity: 0,
    buyNow: true,
    name: '',
    price: 0,
    image: '',
    discountedPrice: 0,
    product: defaultProduct,
}

export interface IShopingCartAddItemResponse {
    item?: IShopingCartItem;
    loginToken?: string;
    totalQuantity?: number;
}

export interface IShopingCartAddItemPayload {
    previousItem?: IShopingCartItem;
    item?: IShopingCartItem;
}

export interface ShopingCartGetRequest extends PaginationRequest {
    buyNow?: boolean;
}

export const defaultShopingCartGetRequest: ShopingCartGetRequest = {
    ...defaultPaginationRequest,
    buyNow: true,
    isPagingEnabled: true,
    pageSize: 8
}

export interface IShopingCart extends PaginatedList<IShopingCartItem> {
    totalQuantity: number;
    totalCost: number;
}

export const defaultShoppingCart: IShopingCart = {
    ...defaultPaginationList,
    totalCost: 0,
    totalQuantity: 0
}
