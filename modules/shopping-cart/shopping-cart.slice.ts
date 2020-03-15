import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentUser } from "../customer/customer.slice";
import {
  ShoppingCartUrl,
  IShopingCartItem,
  IShopingCartAddItemResponse,
  IShopingCartAddItemPayload
} from "./shopping-cart.model";
import { crudInitialState } from "../shared/crud/crud.state";
import { IState } from "../shared/crud/crud.model";
import { succeeded, failed, idle, pending } from "../shared/crud/crud.reducer";

const shoppingCartInitialState = crudInitialState([]) as IState<
  IShopingCartItem[]
>;

export const shoppingCartSlice = createSlice({
  name: ShoppingCartUrl.baseUrl,
  initialState: shoppingCartInitialState,
  reducers: {
    getCartPending(state: IState<IShopingCartItem[]>) {
      pending(state);
    },
    getCartSucceeded(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem[]>
    ) {
      state.data = action.payload;
      succeeded(state);
    },
    getCartFailed(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem[]>
    ) {
      failed(state, action);
    },
    getCartIdle(state: IState<IShopingCartItem[]>) {
      idle(state, shoppingCartInitialState);
    },


    addItemPending(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
      pending(state);
    },
    addItemSucceeded(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartAddItemResponse>
    ) {
      succeeded(state);
    },
    addItemFailed(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
      failed(state, action);
    },
    addItemIdle(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
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

    saveItemForLaterPending(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
      pending(state);
    },
    saveItemForLaterSucceeded(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
      state.data = state.data.filter(x => x.itemId !== action.payload.itemId);
      succeeded(state);
    },
    saveItemForLaterFailed(
      state: IState<IShopingCartItem[]>,
      action: PayloadAction<IShopingCartItem>
    ) {
      failed(state, action);
    },
    saveItemForLaterIdle(state: IState<IShopingCartItem[]>) {
      idle(state, shoppingCartInitialState);
    },
  }
});

const shoppingCartItemCountInitialState = crudInitialState(0) as IState<number>;

export const shoppingCartItemCountSlice = createSlice({
  name: ShoppingCartUrl.baseUrl,
  initialState: shoppingCartItemCountInitialState,
  reducers: {
    getTotalQuantityPending(state: IState<number>) {
      pending(state);
    },
    getTotalQuantitySucceeded(
      state: IState<number>,
      action: PayloadAction<number>
    ) {
      state.data = action.payload;
      succeeded(state);
    },
    getTotalQuantityFailed(
      state: IState<number>,
      action: PayloadAction<number>
    ) {
      failed(state, action);
    },
    getTotalQuantityIdle(state: IState<number>) {
      idle(state, shoppingCartItemCountInitialState);
    }
  },
  extraReducers: {
    [shoppingCartSlice.actions.removeItemSucceeded.toString()]: (
      state: IState<number>,
      action: PayloadAction<IShopingCartItem>
    ) => {
      state.data -= action.payload.quantity;
    },
    [shoppingCartSlice.actions.saveItemForLaterSucceeded.toString()]: (
      state: IState<number>,
      action: PayloadAction<IShopingCartItem>
    ) => {
      state.data -= action.payload.quantity;
    },
    [shoppingCartSlice.actions.addItemSucceeded.toString()]: (
      state: IState<number>,
      action: PayloadAction<IShopingCartAddItemResponse>
    ) => {
      state.data = action.payload.totalQuantity;
    },
    [shoppingCartSlice.actions.updateItemSucceeded.toString()]: (
      state: IState<number>,
      action: PayloadAction<IShopingCartAddItemPayload>
    ) => {
      state.data =
        state.data -
        action.payload.previousItem.quantity +
        action.payload.item.quantity;
    },
    [currentUser.actions.logout.toString()]: (state: IState<number>) => {
      state.data = 0;
    }
  }
});
