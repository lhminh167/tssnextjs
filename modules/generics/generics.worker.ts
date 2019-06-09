/* global fetch */

import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import { put } from 'redux-saga/effects';
import { getFailed, getSucceeded } from './generics.actions';
import { hideMainLoader } from '../loader/loader.redux';
import { enqueueSnackbar } from '../notifier/notifier.redux';
import { showMainLoader } from '../loader/loader.redux';

es6promise.polyfill()


export function Worker(entityName: string) {

  const formattedEntityName = entityName.replace(/([A-Z])/g, ' $1').trim()

  function apiCall(path = '', data = {}, method = 'GET') {

    // let url = `https://localhost:5001${path}`;
  
    // if (process.env.NODE_ENV === 'production')
      let  url = `https://tssnetcore.herokuapp.com/api${path}`;
      console.log(url)
    
    return fetch(url).then(res=>res.json());
  }

  function* get(action) {
    try {
      yield put(showMainLoader())
      const req = action.payload
      const res = yield apiCall(req.path)
      yield put(getSucceeded(entityName, res))
      yield put(hideMainLoader())
      const snack = {
        message: `${formattedEntityName} fetched successfully.`,
        options: {
          variant: 'success',
        },
      }
      yield put(enqueueSnackbar(snack))

    } catch (err) {
      yield put(getFailed(entityName, err))
      yield put(hideMainLoader())
      const snack = {
        message: err,
        options: {
          variant: 'danger',
        },
      }
      yield put(enqueueSnackbar(snack))
    }
  }

  return {
    get
  }
}

