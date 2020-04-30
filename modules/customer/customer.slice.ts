import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IState } from "../shared/crud/crud.model";
import { failed, idle, pending, succeeded } from "../shared/crud/crud.reducer";
import { crudInitialState } from "../shared/crud/crud.state";
import { Customer, customerUrl, defaultCustomer, ICreateCustomerRequest, ILoginRequest } from "./customer.model";

const initialState: IState<Customer> = crudInitialState(defaultCustomer);

export const currentUserSlice = createSlice({
    name: customerUrl.baseUrl,
    initialState,
    reducers: {
        loginPending(
            state: IState<Customer>,
            action: PayloadAction<ILoginRequest>
        ) {
            pending(state);
        },
        loginSucceeded(state: IState<Customer>, action: PayloadAction<Customer>) {
            state.data = action.payload;
            succeeded(state);
        },
        loginFailed(state: IState<Customer>, action: PayloadAction<Customer>) {
            failed(state, action);
        },
        logout(state: IState<Customer>) {
            return {
                ...initialState
            }
        },


        createCustomerPending(
            state: IState<Customer>,
            action: PayloadAction<ICreateCustomerRequest>
        ) {
            pending(state);
        },
        createCustomerSucceeded(state: IState<Customer>, action: PayloadAction<Customer>) {
            state.data = action.payload;
            succeeded(state);
        },
        createCustomerFailed(state: IState<Customer>, action: PayloadAction<Customer>) {
            failed(state, action);
        },


        setCurrentUser(state: IState<Customer>, action: PayloadAction<Customer>) {
            state.data = action.payload;
        },


        getCustomerPending(
            state: IState<Customer>,
            action: PayloadAction<number>
        ) {
            pending(state);
        },
        getCustomerSucceeded(
            state: IState<Customer>,
            action: PayloadAction<Customer>
        ) {
            state.data = action.payload;
            succeeded(state);
        },
        getCustomerFailed(
            state: IState<Customer>,
            action: PayloadAction<Customer>
        ) {
            failed(state, action);
        },
        getCustomerIdle(
            state: IState<Customer>
        ) {
            idle(state, initialState);
        },
    }
});
