// import { all, call } from 'redux-saga/effects';
// import { productFilterWatchers } from '../product-filter/product-filter.saga';
import { shoppingCartWatchers } from '../shopping-cart/shopping-cart.saga';

// const watchers = [
//     ...productFilterWatchers,
//     ...shoppingCartWatchers
// ]

// export function* rootWatcher() {
//     yield all(
//         watchers.map(w => call(w))
//     );
// }

/* global fetch */

import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'

// import { actionTypes, failure, loadDataSuccess, tickClock } from './actions'
// import {user} from './root.reducer'
import { productFilterWatchers } from '../product-filter/product-filter.saga'

es6promise.polyfill()

// function * runClockSaga () {
//   yield take(actionTypes.START_CLOCK)
//   while (true) {
//     yield put(tickClock(false))
//     yield delay(1000)
//   }
// }

// function * loadDataSaga () {
//   try {
//     const res = yield fetch('https://tssnetcore.herokuapp.com/api/ProductFilter/Product')
//     const data = yield res.json()
//     yield put(user.actions.loadDataSuccess(data))
//   } catch (err) {
//     // yield put(reducer.actions.failure(err))
//   }
// }

function * rootSaga () {
  yield all([
    // call(runClockSaga),
    // takeLatest(user.actions.loadData, loadDataSaga)
    ...productFilterWatchers,
    ...shoppingCartWatchers
  ])
}

export default rootSaga