import { all, call } from 'redux-saga/effects';
import { productFilterWatchers } from '../product-filter/product-filter.saga';
import { shoppingCartWatchers } from '../shopping-cart/shopping-cart.saga';

const watchers = [
    ...productFilterWatchers,
    ...shoppingCartWatchers
]

export function* rootWatcher() {
    yield all(
        watchers.map(w => call(w))
    );
}
