/* global fetch */

import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects';
import { productActionTypes, productTickClock } from './product.actions';
import { loadDataSuccess, failure } from '../generics/actions';


es6promise.polyfill()

function* runClockSaga() {
  yield take(productActionTypes.START_CLOCK)
  while (true) {
    yield put(productTickClock(false))
    yield delay(1000)
  }
}

function * loadDataSaga () {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users')
    const data = yield res.json()
    yield put(loadDataSuccess(data))
  } catch (err) {
    yield put(failure(err))
  }
}

function* rootSaga() {
  yield all([
    call(runClockSaga),
    takeLatest(productActionTypes.LOAD_DATA, loadDataSaga)
  ])
}

export default rootSaga
