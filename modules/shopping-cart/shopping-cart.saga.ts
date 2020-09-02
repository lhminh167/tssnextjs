import { call, put, takeLatest } from 'redux-saga/effects';
import { getShoppingCartTotalQuantity } from './shopping-cart.service';
import { shoppingCartItemCountSlice } from './shopping-cart.slice';

function* getTotalQuantityWorker() {
    const response = yield call(getShoppingCartTotalQuantity);
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

export const shoppingCartWatchers = [
    takeLatest(
        shoppingCartItemCountSlice.actions.getTotalQuantityPending,
        getTotalQuantityWorker
    ),
];
