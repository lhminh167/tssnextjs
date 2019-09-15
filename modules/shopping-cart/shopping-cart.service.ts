import { get, post, update, remove } from '../shared/crud/crud.service';
import { ShoppingCartUrl, IShopingCartItem } from './shopping-cart.model';

export async function getCart() {
    return await get(ShoppingCartUrl.baseUrl);
}

export async function addItem(item: IShopingCartItem) {
    return await post(ShoppingCartUrl.baseUrl, item);
}

export async function updateCart(item: IShopingCartItem) {
    return await update(ShoppingCartUrl.baseUrl, item.itemId, item);
}

export async function removeItem(item: IShopingCartItem) {
    return await remove(ShoppingCartUrl.baseUrl, item.itemId, item);
}

export async function saveItemForLater(item: IShopingCartItem) {
    return await update(ShoppingCartUrl.saveItemForLater, item.itemId, item);
}

export async function moveItemToCart(item: IShopingCartItem) {
    return await update(ShoppingCartUrl.moveItemToCart, item.itemId, item);
}
