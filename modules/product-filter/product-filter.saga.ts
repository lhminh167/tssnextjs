import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getFilter, getProduct } from './product-filter.service';
import { productFilter } from './product-filter.slice';

function* getFilterWatcher() {
    yield takeEvery(productFilter.filter.actions.getPending, getFilterWorker);
}

function* getFilterWorker() {

    const { response, error } = yield call(getFilter)
    response ?
        yield put(productFilter.filter.actions.getSucceeded(response)) :
        yield put(productFilter.filter.actions.getFailed(error));
}

function* getProductWatcher() {
    yield takeEvery(productFilter.product.actions.getPending, getProductWorker);
}

function* getProductWorker() {

    const { response, error } = yield call(getProduct)
    response ?
        yield put(productFilter.product.actions.getSucceeded(response)) :
        yield put(productFilter.product.actions.getFailed(error));
}

// function * loadDataSaga () {
//   try {
//     const res = yield fetch('https://tssnetcore.herokuapp.com/api/ProductFilter/Product')
//     const data = yield res.json()
//     yield put(user.actions.loadDataSuccess(data))
//   } catch (err) {
//     // yield put(reducer.actions.failure(err))
//   }
// }


export const productFilterWatchers = [
    takeLatest(productFilter.filter.actions.getPending, getFilterWorker),
    takeLatest(productFilter.product.actions.getPending, getProductWorker)
];
