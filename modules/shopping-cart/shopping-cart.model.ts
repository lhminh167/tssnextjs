const shoppingCartBaseUrl = '/ShoppingCart';

export const ShoppingCartUrl = {
    baseUrl: shoppingCartBaseUrl,
    saveItemForLater: shoppingCartBaseUrl + '/saveItemForLater',
    moveItemToCart: shoppingCartBaseUrl + '/MoveItemToCart',
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
}
