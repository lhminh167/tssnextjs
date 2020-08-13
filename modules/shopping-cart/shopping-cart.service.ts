import { get, post, put, remove } from '../shared/crud/crud.service';
import { ShoppingCartUrl, IShopingCartItem, ShopingCartGetRequest } from './shopping-cart.model';
import { IProductRecommendationGetRequest } from '../shared/models/product.model';
import querystring from 'query-string';
import { PaginationRequest } from '../shared/crud/crud.model';

export async function getShoppingCart(input: ShopingCartGetRequest) {
    return await get(ShoppingCartUrl.shoppingCart(input), 0);
}

export async function addShoppingCartItem(item: IShopingCartItem) {
    return await post(ShoppingCartUrl.baseUrl, item);
}

export async function updateShoppingCartItem(item: IShopingCartItem) {
    return await put(ShoppingCartUrl.baseUrl, item.itemId, item);
}

export async function removeShoppingCartItem(item: IShopingCartItem) {
    return await remove(ShoppingCartUrl.baseUrl, item.itemId, null);
}

export async function getWishList() {
    return await get(ShoppingCartUrl.wishList, 0);
}

export async function saveShoppingCartItemForLater(item: IShopingCartItem) {
    return await put(ShoppingCartUrl.saveItemForLater, item.itemId, item);
}

export async function moveShoppingCartItemToCart(item: IShopingCartItem) {
    return await put(ShoppingCartUrl.moveItemToCart, item.itemId, item);
}

export async function getShoppingCartTotalCost() {
    return await get(ShoppingCartUrl.totalCost, 0);
}

export async function getShoppingCartTotalQuantity() {
    return await get(ShoppingCartUrl.totalQuantity(true), 0);
}

export async function getShoppingCartRecommendation(input: PaginationRequest) {
    return await get(ShoppingCartUrl.recommendation + '?' + querystring.stringify(input), 0);
}
