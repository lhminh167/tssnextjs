/* global fetch */

import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { actionTypes } from './actions';
import { Worker } from './worker';



export function Watcher(entityName) {

  const worker = Worker(entityName)

  function* get() {
    yield takeEvery(actionTypes(entityName).GET_PENDING, worker.get);
  }
}

function* rootSaga() {

  const worker = Worker('product')
  
  yield all([
    takeLatest(actionTypes('product').GET_PENDING, worker.get)
  ])
}

export default rootSaga
