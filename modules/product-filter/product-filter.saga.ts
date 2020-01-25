import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getFilter, getProducts } from './product-filter.service';
import { productFilter } from './product-filter.slice';

function* getFilterWorker() {

    const response = yield call(getFilter)
    response.status < 300 ?
        yield put(productFilter.filter.actions.getSucceeded(response.content)) :
        yield put(productFilter.filter.actions.getFailed(response.title));
}

function* getProductsWorker() {

    const response = yield call(getProducts)
    response.status < 300 ?
        yield put(productFilter.product.actions.getSucceeded(response.content)) :
        yield put(productFilter.product.actions.getFailed(response.title));
}

export const productFilterWatchers = [
    takeLatest(productFilter.filter.actions.getPending, getFilterWorker),
    takeLatest(productFilter.product.actions.getPending, getProductsWorker)
];
