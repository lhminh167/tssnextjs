/* global fetch */

import { all, call, takeEvery, put } from 'redux-saga/effects';
import { actionTypes } from './generics.actions';
import { Worker } from './generics.worker';

export function Watcher(entityName: string, worker = Worker(entityName)) {

  function* get() {
    yield takeEvery(actionTypes(entityName).GET_PENDING, worker.get);
  }

  return [
    get
  ]
}

export function* combineWatchers(watchers) {
  return yield all([
    ...watchers.map(w => call(w))
  ])
}
