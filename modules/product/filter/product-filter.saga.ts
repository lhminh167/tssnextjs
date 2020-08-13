import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getFilter, getProducts } from './product-filter.service';
import productFilterSlice from './product-filter.slice';

function* getFilterWorker() {

    const response = yield call(getFilter)
    response.status < 300 ?
        yield put(productFilterSlice.actions.getFilterSucceeded(response.content)) :
        yield put(productFilterSlice.actions.getFilterFailed(response));
}

function* getProductsWorker(action) {

    const response = yield call(getProducts, action.payload)
    response.status < 300 ?
        yield put(productFilterSlice.actions.getProductsSucceeded(response.content)) :
        yield put(productFilterSlice.actions.getProductsFailed(response));
}

export const productFilterWatchers = [
    takeLatest(productFilterSlice.actions.getFilterPending, getFilterWorker),
    takeLatest(productFilterSlice.actions.getProductsPending, getProductsWorker)
];
