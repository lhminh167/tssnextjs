import { all, call } from 'redux-saga/effects';
import { productWatcher } from './product.watcher';

const watchers = [
  ...productWatcher
]

export function* rootWatcher() {
  yield all(
    watchers.map(w => call(w))
  )
}
