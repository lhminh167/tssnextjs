import { all, call } from 'redux-saga/effects';
import { productFilter } from '../product-filter/product-filter.redux';

const watchers = [
    ...productFilter.filterWatcher,
    ...productFilter.productWatcher
]

export function* rootWatcher() {
    yield all(
        
        watchers.map(w => call(w))
    )
}
