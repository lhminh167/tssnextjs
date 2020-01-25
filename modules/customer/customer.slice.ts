import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IState } from "../shared/crud/crud.model";
import { failed, idle, pending, succeeded } from "../shared/crud/crud.reducer";
import { crudInitialState } from "../shared/crud/crud.state";
import { Customer, customerUrl, ILoginResquest } from "./customer.model";

export const currentUserInitialData: Customer = {
  customerId: "0",
  name: "Visitor",
  email: "",
  // password: "",
  // creditCard: "",
  address1: "",
  address2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "",
  shippingRegionId: 0,
  dayPhone: "",
  evePhone: "",
  mobPhone: "",
  attributes: [],
  role: "Customer"
};

const initialState: IState<Customer> = crudInitialState(currentUserInitialData);

export const currentUser = createSlice({
  name: customerUrl.baseUrl,
  initialState,
  reducers: {
    loginPending(
      state: IState<Customer>,
      action: PayloadAction<ILoginResquest>
    ) {
      pending(state);
    },
    loginSucceeded(state: IState<Customer>, action: PayloadAction<Customer>) {
      state.data = action.payload;
      state.data.role = action.payload.attributes.find(
        a => a.name === "Role"
      ).value;
      succeeded(state);
    },
    loginFailed(state: IState<Customer>, action: PayloadAction<Customer>) {
      failed(state, action);
    },
    logout(state: IState<Customer>) {
      return {
        ...initialState
      }
      // idle(state, initialState);
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
