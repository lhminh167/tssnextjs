import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentUser } from "../customer/customer.slice";
import { crudInitialState } from "../shared/crud/crud.state";
import { IState } from "../shared/crud/crud.model";
import { succeeded, failed, idle, pending } from "../shared/crud/crud.reducer";
import { IShopingCartItem, ShoppingCartUrl, IShopingCartAddItemPayload } from "../shopping-cart/shopping-cart.model";

const shoppingCartInitialState = crudInitialState([]) as IState<
  IShopingCartItem[]
>;

export const wishListSlice = createSlice({
  name: ShoppingCartUrl.baseUrl,
  initialState: shoppingCartInitialState,
  reducers: {
    getWishlistPending(state: IState<IShopingCartItem[]>) {
      pending(state);
    },
    getWishlistSucceeded(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem[]>
    ) {
      state.data = action.payload;
      succeeded(state);
    },
    getWishlistFailed(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem[]>
    ) {
      failed(state, action);
    },
    getWishlistIdle(state: IState<IShopingCartItem[]>) {
      idle(state, shoppingCartInitialState);
    },

    updateItemPending(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartAddItemPayload>
    ) {
      pending(state);
    },
    updateItemSucceeded(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartAddItemPayload>
    ) {
      const index = state.data.findIndex(
        i => i.itemId === action.payload.item.itemId
      );
      state.data[index] = action.payload.item;
      succeeded(state);
    },
    updateItemFailed(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
      failed(state, action);
    },
    updateItemIdle(state: IState<IShopingCartItem[]>) {
      idle(state, shoppingCartInitialState);
    },

    removeItemPending(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
      pending(state);
    },
    removeItemSucceeded(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
      state.data = state.data.filter(x => x.itemId !== action.payload.itemId);
      succeeded(state);
    },
    removeItemFailed(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
      failed(state, action);
    },
    removeItemIdle(state: IState<IShopingCartItem[]>) {
      idle(state, shoppingCartInitialState);
    },

    moveItemToCartPending(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
      pending(state);
    },
    moveItemToCartSucceeded(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
      state.data = state.data.filter(x => x.itemId !== action.payload.itemId);
      succeeded(state);
    },
    moveItemToCartFailed(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
      failed(state, action);
    },
    moveItemToCartIdle(state: IState<IShopingCartItem[]>) {
      idle(state, shoppingCartInitialState);
    }
  }
});
