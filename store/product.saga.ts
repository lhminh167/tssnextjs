/* global fetch */

import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects';
import { productActionTypes, failure, loadDataSuccess, tickClock } from './product.actions';
import { service } from './product.service';


es6promise.polyfill()

function* runClockSaga() {
  yield take(productActionTypes.START_CLOCK)
  while (true) {
    yield put(tickClock(false))
    yield delay(1000)
  }
}

function* loadDataSaga() {
  try {
    const data = yield service()
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
