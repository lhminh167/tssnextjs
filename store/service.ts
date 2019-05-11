/* global fetch */

import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import { put } from 'redux-saga/effects';
import { failure } from './actions';

es6promise.polyfill()

export function* service() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users')
    const data = yield res.json()
    return data;
  } catch (err) {
    yield put(failure(err))
  }
}

