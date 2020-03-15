import { call, put, takeLatest } from "redux-saga/effects";
import { removeLoginToken, setLoginToken } from "../shared/helpers/token.helper";
import { shoppingCartItemCountSlice } from "../shopping-cart/shopping-cart.slice";
import { getCustomer, login, createCustomer } from "./customer.service";
import { currentUser } from "./customer.slice";
import Router from "next/router";

function* loginWorker(action) {
  const response = yield call(login, action.payload);

  if (response.status < 300) {
    yield put(currentUser.actions.loginSucceeded(response.content.customer));
    setLoginToken(response.content.loginToken);
    yield put(shoppingCartItemCountSlice.actions.getTotalQuantityPending());
    let returnUrl = "/";
    const next = Router.query?.next as string;
    if (next?.length > 0 && next !== undefined) returnUrl = next;
    Router.push(returnUrl);
  } else {
    yield put(currentUser.actions.loginFailed(response.title));
  }
}

function logoutWorker(action) {
  removeLoginToken();
  Router.push(action.payload ?? '/');
}

function* createCustomerWorker(action) {
  const response = yield call(createCustomer, action.payload)
  if (response.status < 300) {
    yield put(currentUser.actions.createCustomerSucceeded(response.content.customer));
    setLoginToken(response.content.loginToken);
    yield put(shoppingCartItemCountSlice.actions.getTotalQuantityPending());
    let returnUrl = "/";
    const next = Router.query?.next as string;
    if (next?.length > 0 && next !== undefined) returnUrl = next;
    Router.push(returnUrl);
  } else {
    yield put(currentUser.actions.createCustomerFailed(response.title));
  }
}

function* getCustomerWorker(action) {
  const response = yield call(getCustomer, action.payload);
  response.status < 300 ?
    yield put(currentUser.actions.getCustomerSucceeded(response.content)) :
    yield put(currentUser.actions.getCustomerFailed(response.title));
}

// function* deleteCustomerWorker(action) {
//     yield put(mainLoader.actions.show());
//     const { response, error } = yield call(deleteCustomer, action.payload)
//     response ?
//         yield put(currentUser.actions.deleteCustomerSucceeded(response)) :
//         yield put(currentUser.actions.deleteCustomerFailed(error));
// }

// function* updateCustomerWorker(action) {
//     yield put(mainLoader.actions.show());
//     const { response, error } = yield call(updateCustomer, action.payload)
//     response ?
//         yield put(currentUser.actions.updateCustomerSucceeded(response)) :
//         yield put(currentUser.actions.updateCustomerFailed(error));
// }

// function* getCustomersWorker() {

//     const { response, error } = yield call(getCustomers)
//     response ?
//         yield put(currentUser.actions.getCustomersSucceeded(response)) :
//         yield put(currentUser.actions.getCustomersFailed(error));
// }

export const customerWatchers = [
  takeLatest(currentUser.actions.logout, logoutWorker),
  takeLatest(currentUser.actions.loginPending, loginWorker),
  takeLatest(currentUser.actions.getCustomerPending, getCustomerWorker),
  takeLatest(currentUser.actions.createCustomerPending, createCustomerWorker)

];
