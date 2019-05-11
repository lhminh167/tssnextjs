/* global fetch */

import { all, takeEvery, call } from 'redux-saga/effects';
import { actionTypes } from './actions';
import { Worker } from './worker';

export function Watcher(entityName) {

  const worker = Worker(entityName)

  function* get() {
    yield takeEvery(actionTypes(entityName).GET_PENDING, worker.get);
  }

  return [
    get
  ]
}

export function* combineWatchers(watchers) {  
  return yield all([
    ...watchers.map(w=>call(w))
  ])
}
