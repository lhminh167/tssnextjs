import { combineReducers } from 'redux';
import { product } from '../product/product.redux';
import { mainLoader } from '../loader/loader.redux';
import { notifier } from '../notifier/notifier.redux';
import { productFilter } from '../product.filter/product.filter.redux';

export const rootReducer = combineReducers({
    product: product.reducer,
    mainLoader: mainLoader.reducer,
    notifier: notifier.reducer,
    productFilter: productFilter.reducer
})
