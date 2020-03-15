import { combineReducers } from '@reduxjs/toolkit';
// import { mainLoader } from '../shared/loader/loader.redux';
// import { notifier } from '../shared/notifier/notifier.redux';
import { currentUser } from '../customer/customer.slice';
import { shoppingCartSlice, shoppingCartItemCountSlice } from '../shopping-cart/shopping-cart.slice';
import { wishListSlice } from '../wish-list/wish-list.slice';
import productFilterSlice from '../product/filter/product-filter.slice';


export const rootReducer = combineReducers({
    // mainLoader: mainLoader.reducer,
    // notifier: notifier.reducer,
    currentUser: currentUser.reducer,
    productFilter: productFilterSlice.reducer,
    shoppingCartItemCount: shoppingCartItemCountSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    wishList: wishListSlice.reducer
});