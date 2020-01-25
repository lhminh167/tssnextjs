import { combineReducers } from '@reduxjs/toolkit';
import { productFilter } from '../product-filter/product-filter.slice';
// import { mainLoader } from '../shared/loader/loader.redux';
// import { notifier } from '../shared/notifier/notifier.redux';
import { currentUser } from '../customer/customer.slice';
import { shoppingCartSlice, shoppingCartItemCountSlice } from '../shopping-cart/shopping-cart.slice';

const productFilterReducer = combineReducers({
    filter: productFilter.filter.reducer,
    product: productFilter.product.reducer,
    choice: productFilter.choice.reducer,
})

export const rootReducer = combineReducers({
    // mainLoader: mainLoader.reducer,
    // notifier: notifier.reducer,
    currentUser: currentUser.reducer,
    productFilter: productFilterReducer,
    shoppingCartItemCount: shoppingCartItemCountSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
});