import {combineWatchers} from '../generics/watcher'
import { productWatcher } from './product.watcher';
import { call, all } from 'redux-saga/effects';

const watchers = [
  ...productWatcher
]


export function * rootSaga () {
  yield all(
    watchers.map(w=>call(w))
  )
}
