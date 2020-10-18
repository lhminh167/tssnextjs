// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { currentUserSlice } from '../customer/customer.slice';
// import {
//     apiShoppingCartUrl,
//     IShopingCartItem,
//     IShopingCartAddItemResponse,
//     IShopingCartAddItemPayload
// } from './shopping-cart.model';
// import { crudInitialState } from '../shared/crud/crud.state';
// import { IState } from '../shared/crud/crud.model';
// import { succeeded, failed, idle, pending } from '../shared/crud/crud.reducer';


// const shoppingCartItemCountInitialState = crudInitialState(0) as IState<number>;

// export const shoppingCartItemCountSlice = createSlice({
//     name: apiShoppingCartUrl.baseUrl,
//     initialState: shoppingCartItemCountInitialState,
//     reducers: {
//         getTotalQuantityPending(state: IState<number>) {
//             pending(state);
//         },
//         getTotalQuantitySucceeded(
//             state: IState<number>,
//             action: PayloadAction<number>
//         ) {
//             state.data = action.payload;
//             succeeded(state);
//         },
//         getTotalQuantityFailed(
//             state: IState<number>,
//             action: PayloadAction<number>
//         ) {
//             failed(state, action);
//         },
//         getTotalQuantityIdle(state: IState<number>) {
//             idle(state, shoppingCartItemCountInitialState);
//         },
//         change(state: IState<number>, action: PayloadAction<number>) {
//             state.data = action.payload;
//         },
//         add(state: IState<number>, action: PayloadAction<number>) {
//             state.data += action.payload;
//         },
//     },
//     extraReducers: builder => {
//         builder.addCase(currentUserSlice.actions.logout, (state) => {
//             state.data = 0;
//         })
//     }
// });
