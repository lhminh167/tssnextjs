import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentUserSlice } from '../customer/customer.slice';
import { IState } from '../shared/crud/crud.model';
import { failed, idle, pending, succeeded } from '../shared/crud/crud.reducer';
import { crudInitialState } from '../shared/crud/crud.state';
import { apiShoppingCartUrl } from './shopping-cart.model';
import { IRootState } from '../root/root.model';


export const shoppingCartItemCountInitialState = crudInitialState(0) as IState<number>;

export const shoppingCartItemCountSelector = (state: IRootState) => state?.shoppingCartItemCount?.data;

export const shoppingCartItemCountSlice = createSlice({
    name: apiShoppingCartUrl.baseUrl,
    initialState: shoppingCartItemCountInitialState,
    reducers: {
        getTotalQuantityPending(state: IState<number>) {
            pending(state);
        },
        getTotalQuantitySucceeded(
            state: IState<number>,
            action: PayloadAction<number>
        ) {
            state.data = action.payload;
            succeeded(state);
        },
        getTotalQuantityFailed(
            state: IState<number>,
            action: PayloadAction<number>
        ) {
            failed(state, action);
        },
        getTotalQuantityIdle(state: IState<number>) {
            idle(state, shoppingCartItemCountInitialState);
        },
        change(state: IState<number>, action: PayloadAction<number>) {
            state.data = action.payload;
        },
        add(state: IState<number>, action: PayloadAction<number>) {
            state.data += action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(currentUserSlice.actions.logout, (state) => {
            state.data = 0;
        })
    }
});
