import querystring from "query-string";
import {
  defaultPaginationList,
  defaultPaginationRequest,
  PaginatedList,
  PaginationRequest,
} from "../shared/crud/crud.model";
import { defaultProduct, IProduct } from "../shared/models/product.model";

const apiShoppingCartBaseUrl = "shoppingCart";

export const apiShoppingCartUrl = {
  baseUrl: apiShoppingCartBaseUrl,
  saveItemForLater: apiShoppingCartBaseUrl + "/" + "saveItemForLater",
  moveItemToCart: apiShoppingCartBaseUrl + "/" + "MoveItemToCart",
  totalCost: apiShoppingCartBaseUrl + "/" + "TotalCost",
  totalQuantity: (buyNow: boolean) =>
    apiShoppingCartBaseUrl + "/TotalQuantity?buyNow=" + buyNow,
  shoppingCart: (input: ShopingCartGetRequest) =>
    apiShoppingCartBaseUrl + "?" + querystring.stringify(input),
  wishList: `${apiShoppingCartBaseUrl}?buyNow=false`,
  recommendation: `${apiShoppingCartBaseUrl}/Recommendation`,
  detail: (itemId: number) => `${apiShoppingCartBaseUrl}/${itemId}`,
};

const shoppingCartBaseUrl = "/shopping-cart";

export const shoppingCartUrl = {
  baseUrl: shoppingCartBaseUrl,
  wishList: `/wish-list`,
};

export interface IShopingCartItem {
  itemId: number;
  productId: number;
  attributes: string;
  quantity: number;
  buyNow: boolean;
  name: string;
  price: number;
  image: string;
  discountedPrice: number;
  product: IProduct;
}

export const defaultShoppingCartItem: IShopingCartItem = {
  itemId: 0,
  productId: 0,
  attributes: "",
  quantity: 0,
  buyNow: true,
  name: "",
  price: 0,
  image: "",
  discountedPrice: 0,
  product: defaultProduct,
};

export interface IShopingCartAddItemResponse {
  item: IShopingCartItem;
  loginToken: string;
  totalQuantity: number;
}

export interface IShopingCartAddItemPayload {
  previousItem: IShopingCartItem;
  item: IShopingCartItem;
}

export interface ShopingCartGetRequest extends PaginationRequest {
  buyNow: boolean;
}

export const defaultShopingCartGetRequest: ShopingCartGetRequest = {
  ...defaultPaginationRequest,
  buyNow: true,
  isPagingEnabled: true,
  pageSize: 8,
};

export interface IShopingCart extends PaginatedList<IShopingCartItem> {
  totalQuantity: number;
  totalCost: number;
}

export const defaultShoppingCart: IShopingCart = {
  ...defaultPaginationList,
  totalCost: 0,
  totalQuantity: 0,
};
