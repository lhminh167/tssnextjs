import { call, put, takeLatest } from "redux-saga/effects";
import { mainLoader } from "../shared/loader/loader.redux";
import { getWishList, moveItemToCart, removeItem, updateItem } from "../shopping-cart/shopping-cart.service";
import { wishListSlice } from "./wish-list.slice";

function* getWishlistWorker() {
  const response = yield call(getWishList);
  response.status < 300 ?
    yield put(wishListSlice.actions.getWishlistSucceeded(response.content)) :
    yield put(wishListSlice.actions.getWishlistFailed(response.title));
}

function* moveItemToCartWorker(action) {
  const response = yield call(moveItemToCart, action.payload);
  response.status < 300 ?
    yield put(wishListSlice.actions.getWishlistSucceeded(response.content)) :
    yield put(wishListSlice.actions.getWishlistFailed(response.title));
}

function* updateItemWorker(action) {
  yield put(mainLoader.actions.show());
  const response = yield call(updateItem, action.payload.item);
  if (response.status < 300) {
    yield put(
      wishListSlice.actions.updateItemSucceeded({
        item: response.content,
        previousItem: action.payload.previousItem
      })
    );
  } else {
    yield put(wishListSlice.actions.updateItemFailed(response.title));
  }
}

function* removeItemWorker(action) {
  yield put(mainLoader.actions.show());
  const response = yield call(removeItem, action.payload);
  response.status < 300
    ? yield put(wishListSlice.actions.removeItemSucceeded(response.content))
    : yield put(wishListSlice.actions.removeItemFailed(response.title));
}

export default [
  takeLatest(wishListSlice.actions.updateItemPending, updateItemWorker),
  takeLatest(wishListSlice.actions.removeItemPending, removeItemWorker),
  takeLatest(
    wishListSlice.actions.moveItemToCartPending,
    moveItemToCartWorker
  ),
  takeLatest(
    wishListSlice.actions.getWishlistPending,
    getWishlistWorker
  ),
];
