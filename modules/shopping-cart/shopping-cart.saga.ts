import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { setLoginToken } from "../shared/helpers/token.helper";
import { mainLoader } from "../shared/loader/loader.redux";
import {
  addItem,
  getCart,
  getTotalQuantity,
  removeItem,
  saveItemForLater,
  updateItem,
  getWishList,
  moveItemToCart
} from "./shopping-cart.service";
import {
  shoppingCartItemCountSlice,
  shoppingCartSlice
} from "./shopping-cart.slice";

function* getTotalQuantityWorker() {
  const response = yield call(getTotalQuantity);
  response.status < 300
    ? yield put(
      shoppingCartItemCountSlice.actions.getTotalQuantitySucceeded(
        response.content
      )
    )
    : yield put(
      shoppingCartItemCountSlice.actions.getTotalQuantityFailed(
        response.title
      )
    );
}

function* getCartWorker() {
  const response = yield call(getCart);
  response.status < 300
    ? yield put(shoppingCartSlice.actions.getCartSucceeded(response.content))
    : yield put(shoppingCartSlice.actions.getCartFailed(response.title));
}

function* addItemWorker(action) {
  const response = yield call(addItem, action.payload);
  if (response.status < 300) {
    setLoginToken(response.content.loginToken);
    yield put(shoppingCartSlice.actions.addItemSucceeded(response.content));
  } else {
    yield put(shoppingCartSlice.actions.addItemFailed(response.title));
  }
}

function* updateItemWorker(action) {
  yield put(mainLoader.actions.show());
  const response = yield call(updateItem, action.payload.item);
  if (response.status < 300) {
    yield put(
      shoppingCartSlice.actions.updateItemSucceeded({
        item: response.content,
        previousItem: action.payload.previousItem
      })
    );
  } else {
    yield put(shoppingCartSlice.actions.updateItemFailed(response.title));
  }
}

function* removeItemWorker(action) {
  yield put(mainLoader.actions.show());
  const response = yield call(removeItem, action.payload);
  response.status < 300
    ? yield put(shoppingCartSlice.actions.removeItemSucceeded(response.content))
    : yield put(shoppingCartSlice.actions.removeItemFailed(response.title));
}

function* saveItemForLaterWorker(action) {
  yield put(mainLoader.actions.show());
  const response = yield call(saveItemForLater, action.payload);
  response.status < 300
    ? yield put(
      shoppingCartSlice.actions.saveItemForLaterSucceeded(response.content)
    )
    : yield put(
      shoppingCartSlice.actions.saveItemForLaterFailed(response.title)
    );
}

export const shoppingCartWatchers = [
  takeLatest(
    shoppingCartItemCountSlice.actions.getTotalQuantityPending,
    getTotalQuantityWorker
  ),
  takeLatest(shoppingCartSlice.actions.getCartPending, getCartWorker),
  takeLatest(shoppingCartSlice.actions.addItemPending, addItemWorker),
  takeLatest(shoppingCartSlice.actions.updateItemPending, updateItemWorker),
  takeLatest(shoppingCartSlice.actions.removeItemPending, removeItemWorker),
  takeLatest(
    shoppingCartSlice.actions.saveItemForLaterPending,
    saveItemForLaterWorker
  ),
];
