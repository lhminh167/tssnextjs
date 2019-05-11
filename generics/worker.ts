/* global fetch */

import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import { put } from 'redux-saga/effects';
import { getFailed, getSucceeded } from './actions';


es6promise.polyfill()


export function Worker(entityName) {

  function apiCall(path = '', data = {}, method = 'GET') {

    // let url = `https://localhost:5001${path}`;
  
    // if (process.env.NODE_ENV === 'production')
      let  url = `https://tssnetcore.herokuapp.com/api${path}`;
    
    return fetch(url).then(res=>res.json());
  }

  function* get(action) {
    try {
      const req = action.payload
      const res = yield apiCall(req.path)
      yield put(getSucceeded(entityName, res))
    } catch (err) {
      yield put(getFailed(entityName, err))
    }
  }

  return {
    get
  }
}

