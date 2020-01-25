import { get, post, put, remove } from '../shared/crud/crud.service';
import { ShoppingCartUrl, IShopingCartItem } from './shopping-cart.model';

export async function getCart() {
    return await get(ShoppingCartUrl.baseUrl, 0);
}

export async function addItem(item: IShopingCartItem) {
    return await post(ShoppingCartUrl.baseUrl, item);
}

export async function updateItem(item: IShopingCartItem) {
    return await put(ShoppingCartUrl.baseUrl, item.itemId, item);
}

export async function removeItem(item: IShopingCartItem) {
    return await remove(ShoppingCartUrl.baseUrl, item.itemId, null);
}

export async function saveItemForLater(item: IShopingCartItem) {
    return await put(ShoppingCartUrl.saveItemForLater, item.itemId, item);
}

export async function moveItemToCart(item: IShopingCartItem) {
    return await put(ShoppingCartUrl.moveItemToCart, item.itemId, item);
}

export async function getTotalCost() {
    return await get(ShoppingCartUrl.totalCost, 0);
}

export async function getTotalQuantity() {
    return await get(ShoppingCartUrl.totalQuantity, 0);
}
