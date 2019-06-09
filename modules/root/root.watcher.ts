import { all, call } from 'redux-saga/effects';
import { productWatcher } from '../product/product.redux';
import { productFilterWatcher } from '../product.filter/product.filter.redux';

const watchers = [
  ...productWatcher,
  ...productFilterWatcher
]

export function* rootWatcher() {
  yield all(
    watchers.map(w => call(w))
  )
}
