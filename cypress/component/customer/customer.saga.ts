import { call, put, takeLatest } from 'redux-saga/effects';
import { removeLoginToken, setLoginToken } from '../shared/helpers/token.helper';
import { shoppingCartItemCountSlice } from '../shopping-cart/shopping-cart.slice';
import { getCustomer, login, createCustomer } from './customer.service';
import { currentUserSlice } from './customer.slice';
import Router from 'next/router';
import { goTo, backToPreviousPage } from '../shared/helpers/auth.helper';

function* loginWorker(action) {
  const response = yield call(login, action.payload);

  if (response.status >= 300) {
    yield put(currentUserSlice.actions.loginFailed(response.title));
    return;
  }

  yield put(currentUserSlice.actions.loginSucceeded(response.content.customer));
  setLoginToken(response.content.loginToken);
  yield put(shoppingCartItemCountSlice.actions.getTotalQuantityPending());
  backToPreviousPage();
}

function logoutWorker(action) {
  removeLoginToken();
  goTo(action.payload);
}

function* createCustomerWorker(action) {
  const response = yield call(createCustomer, action.payload);

  if (response.status >= 300) {
    yield put(currentUserSlice.actions.createCustomerFailed(response.title));
    return;
  }

  yield put(currentUserSlice.actions.createCustomerSucceeded(response.content.customer));
  setLoginToken(response.content.loginToken);
  yield put(shoppingCartItemCountSlice.actions.getTotalQuantityPending());
  backToPreviousPage();
}

function* getCustomerWorker(action) {
  const response = yield call(getCustomer, action.payload);
  response.status < 300 ?
    yield put(currentUserSlice.actions.getCustomerSucceeded(response.content)) :
    yield put(currentUserSlice.actions.getCustomerFailed(response.title));
}

// function* deleteCustomerWorker(action) {
//     yield put(mainLoader.actions.show());
//     const { response, error } = yield call(deleteCustomer, action.payload)
//     response ?
//         yield put(currentUserSlice.actions.deleteCustomerSucceeded(response)) :
//         yield put(currentUserSlice.actions.deleteCustomerFailed(error));
// }

// function* updateCustomerWorker(action) {
//     yield put(mainLoader.actions.show());
//     const { response, error } = yield call(updateCustomer, action.payload)
//     response ?
//         yield put(currentUserSlice.actions.updateCustomerSucceeded(response)) :
//         yield put(currentUserSlice.actions.updateCustomerFailed(error));
// }

// function* getCustomersWorker() {

//     const { response, error } = yield call(getCustomers)
//     response ?
//         yield put(currentUserSlice.actions.getCustomersSucceeded(response)) :
//         yield put(currentUserSlice.actions.getCustomersFailed(error));
// }

export const customerWatchers = [
  takeLatest(currentUserSlice.actions.logout, logoutWorker),
  takeLatest(currentUserSlice.actions.loginPending, loginWorker),
  takeLatest(currentUserSlice.actions.getCustomerPending, getCustomerWorker),
  takeLatest(currentUserSlice.actions.createCustomerPending, createCustomerWorker)

];
