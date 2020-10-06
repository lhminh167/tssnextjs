import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState } from '../shared/crud/crud.model';
import { failed, idle, pending, succeeded } from '../shared/crud/crud.reducer';
import { crudInitialState } from '../shared/crud/crud.state';
import { Customer, apiCustomerUrl, defaultCustomer, ICreateCustomerRequest, ILoginRequest } from './customer.model';
import { IRootState } from '../root/root.model';

type CurrentUserState = IState<Customer>;
type CurrentUserAction = PayloadAction<Customer>;

const initialState: CurrentUserState = crudInitialState(defaultCustomer);

export const customerIdSelector = (state: IRootState) => state?.currentUser?.data?.customerId;

export const currentUserSlice = createSlice({
    name: apiCustomerUrl.baseUrl,
    initialState,
    reducers: {
        loginPending(
            state: CurrentUserState,
            action: PayloadAction<ILoginRequest>
        ) {
            pending(state);
        },
        loginSucceeded(state: CurrentUserState, action: CurrentUserAction) {
            state.data = action.payload;
            succeeded(state);
        },
        loginFailed(state: CurrentUserState, action: CurrentUserAction) {
            failed(state, action);
        },
        logout(state: CurrentUserState) {
            return {
                ...initialState
            }
        },


        createCustomerPending(
            state: CurrentUserState,
            action: PayloadAction<ICreateCustomerRequest>
        ) {
            pending(state);
        },
        createCustomerSucceeded(state: CurrentUserState, action: CurrentUserAction) {
            state.data = action.payload;
            succeeded(state);
        },
        createCustomerFailed(state: CurrentUserState, action: CurrentUserAction) {
            failed(state, action);
        },


        setCurrentUser(state: CurrentUserState, action: CurrentUserAction) {
            state.data = action.payload;
        },


        getCustomerPending(
            state: CurrentUserState,
            action: PayloadAction<number>
        ) {
            pending(state);
        },
        getCustomerSucceeded(
            state: CurrentUserState,
            action: CurrentUserAction
        ) {
            state.data = action.payload;
            succeeded(state);
        },
        getCustomerFailed(
            state: CurrentUserState,
            action: CurrentUserAction
        ) {
            failed(state, action);
        },
        getCustomerIdle(
            state: CurrentUserState
        ) {
            idle(state, initialState);
        },
    }
});
