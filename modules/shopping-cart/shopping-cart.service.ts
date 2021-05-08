import querystring from 'query-string';
import { IResponse, PaginationRequest } from '../shared/crud/crud.model';
import { get, post, put, remove } from '../shared/crud/crud.service';
import { IShopingCartItem, ShopingCartGetRequest, apiShoppingCartUrl } from './shopping-cart.model';

export async function getShoppingCart(input: ShopingCartGetRequest) {
    return await get(apiShoppingCartUrl.shoppingCart(input), 0);
}

export async function addShoppingCartItem(item: IShopingCartItem) {
    return await post(apiShoppingCartUrl.baseUrl, item);
}

export async function updateShoppingCartItem(item: IShopingCartItem): Promise<IResponse<IShopingCartItem>> {
    return await put(apiShoppingCartUrl.baseUrl, item.itemId, item);
}

export async function removeShoppingCartItem(item: IShopingCartItem) {
    return await remove(apiShoppingCartUrl.baseUrl, item.itemId, null);
}

export async function getWishList() {
    return await get(apiShoppingCartUrl.wishList, 0);
}

export async function saveShoppingCartItemForLater(item: IShopingCartItem) {
    return await put(apiShoppingCartUrl.saveItemForLater, item.itemId, item);
}

export async function moveShoppingCartItemToCart(item: IShopingCartItem) {
    return await put(apiShoppingCartUrl.moveItemToCart, item.itemId, item);
}

export async function getShoppingCartTotalCost() {
    return await get(apiShoppingCartUrl.totalCost, 0);
}

export async function getShoppingCartTotalQuantity() {
    return await get(apiShoppingCartUrl.totalQuantity(true), 0);
}

export async function getShoppingCartRecommendation(input: PaginationRequest) {
    return await get(apiShoppingCartUrl.recommendation + '?' + querystring.stringify(input), 0);
}
