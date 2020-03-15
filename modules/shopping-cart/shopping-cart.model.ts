import { defaultProduct, IProduct } from "../shared/models/product.model";

const shoppingCartBaseUrl = 'shoppingCart';

export const ShoppingCartUrl = {
    baseUrl: shoppingCartBaseUrl,
    saveItemForLater: shoppingCartBaseUrl + '/' + 'saveItemForLater',
    moveItemToCart: shoppingCartBaseUrl + '/' + 'MoveItemToCart',
    totalCost: shoppingCartBaseUrl + '/' + 'TotalCost',
    totalQuantity: shoppingCartBaseUrl + '/' + 'TotalQuantity',
    wishList: shoppingCartBaseUrl + '/' + 'WishList',
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