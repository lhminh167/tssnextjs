import { combineReducers } from 'redux-starter-kit';
import { productFilter } from '../product-filter/product-filter.slice';
// import { mainLoader } from '../shared/loader/loader.redux';
// import { notifier } from '../shared/notifier/notifier.redux';
import shoppingCart from '../shopping-cart/shopping-cart.slice';

const productFilterReducer = combineReducers({
    filter: productFilter.filter.reducer,
    product: productFilter.product.reducer,
    choice: productFilter.choice.reducer,
})

export const rootReducer = combineReducers({
    // mainLoader: mainLoader.reducer,
    // notifier: notifier.reducer,
    productFilter: productFilterReducer,
    shoppingCart: shoppingCart.reducer,
})

// import { createSlice, combineReducers } from 'redux-starter-kit'
// import { createStore } from 'redux'

// export const exampleInitialState = {
// }

// export const user = createSlice({
//     slice: 'user',
//     // for ssr, initialState must be null
//     initialState: null,
//     reducers: {
//         loadDataSuccess: (state, action) => {
//             // you must return the state with spread operator
//             return {
//                 ...state,
//                 ...action.payload
//             }

//         },
//         loadData: (state, action) => state,
//     },
// })

// const reducer = combineReducers({
//     placeholderData: user.reducer,
// })

// export default reducer