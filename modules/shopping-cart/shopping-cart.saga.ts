import { IShopingCartItem } from './shopping-cart.model';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getCart, addItem, updateCart, removeItem, saveItemForLater } from './shopping-cart.service';
import shoppingCart from './shopping-cart.slice';
import { IAction } from '../shared/crud/crud.model';
import { mainLoader } from '../shared/loader/loader.redux';

function* getCartWatcher() {
    yield takeEvery(shoppingCart.actions.getCartPending, getCartWorker);
}

function* getCartWorker() {
    const { response, error } = yield call(getCart);
    response ?
        yield put(shoppingCart.actions.getCartSucceeded(response)) :
        yield put(shoppingCart.actions.getCartFailed(error));
}

// function* getWishlistWatcher() {
//     yield takeEvery(shoppingCart.actions.getWishlistPending, getWishlistWorker);
// }

// function* getWishlistWorker() {

//     const { response, error } = yield call(getWishlist)
//     response ?
//         yield put(shoppingCart.actions.getWishlistSucceeded(response)) :
//         yield put(shoppingCart.actions.getWishlistFailed(error));
// }

function* addItemWatcher() {
    yield takeEvery(shoppingCart.actions.addItemPending, addItemWorker);
}

function* addItemWorker(action) {
    const { response, error } = yield call(addItem, action.payload.content)
    response ?
        yield put(shoppingCart.actions.addItemSucceeded(response)) :
        yield put(shoppingCart.actions.addItemFailed(error));
}

function* updateCartWatcher() {
    yield takeEvery(shoppingCart.actions.updateCartPending, updateCartWorker);
}

function* updateCartWorker(action) {
    yield put(mainLoader.actions.show());
    const { response, error } = yield call(updateCart, action.payload.content);
    response ?
        yield put(shoppingCart.actions.updateCartSucceeded(response)) :
        yield put(shoppingCart.actions.updateCartFailed(error));
}

function* removeItemWatcher() {
    yield takeEvery(shoppingCart.actions.removeItemPending, removeItemWorker);
}

function* removeItemWorker(action) {
    yield put(mainLoader.actions.show());
    const { response, error } = yield call(removeItem, action.payload.content)
    response ?
        yield put(shoppingCart.actions.removeItemSucceeded(response)) :
        yield put(shoppingCart.actions.removeItemFailed(error));
}

function* saveItemForLaterWatcher() {
    yield takeEvery(shoppingCart.actions.saveItemForLaterPending, saveItemForLaterWorker);
}

function* saveItemForLaterWorker(action) {
    yield put(mainLoader.actions.show());
    const { response, error } = yield call(saveItemForLater, action.payload.content)
    response ?
        yield put(shoppingCart.actions.saveItemForLaterSucceeded(response)) :
        yield put(shoppingCart.actions.saveItemForLaterFailed(error));
}

// function* getFilterWatcher() {
//     yield takeEvery(shoppingCart.actions.getPending, getFilterWorker);
// }

// function* getFilterWorker() {

//     const { response, error } = yield call(getFilter)
//     response ?
//         yield put(shoppingCart.actions.getSucceeded(response)) :
//         yield put(shoppingCart.actions.getFailed(error));
// }

export const shoppingCartWatchers = [
    // getCartWatcher,
    // getWishlistWatcher,
    // addItemWatcher,
    // updateCartWatcher,
    // removeItemWatcher,
    // saveItemForLaterWatcher,
    takeLatest(shoppingCart.actions.getCartPending, getCartWorker),
    takeLatest(shoppingCart.actions.addItemPending, addItemWorker),
    takeLatest(shoppingCart.actions.updateCartPending, updateCartWorker),
    takeLatest(shoppingCart.actions.removeItemPending, removeItemWorker),
    takeLatest(shoppingCart.actions.saveItemForLaterPending, saveItemForLaterWorker),

];