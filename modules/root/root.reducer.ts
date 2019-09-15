import { combineReducers } from 'redux-starter-kit';
import { productFilter } from '../product-filter/product-filter.slice';
import { mainLoader } from '../shared/loader/loader.redux';
import { notifier } from '../shared/notifier/notifier.redux';
import shoppingCart from '../shopping-cart/shopping-cart.slice';

const productFilterReducer = combineReducers({
    filter: productFilter.filter.reducer,
    product: productFilter.product.reducer,
    choice: productFilter.choice.reducer,
})

export const rootReducer = combineReducers({
    mainLoader: mainLoader.reducer,
    notifier: notifier.reducer,
    productFilter: productFilterReducer,
    shoppingCart: shoppingCart.reducer,
})
