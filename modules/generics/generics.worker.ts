/* global fetch */

import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import { put } from 'redux-saga/effects';
import { mainLoader } from '../loader/loader.redux';
import { notifier } from '../notifier/notifier.redux';
import { NewSlice, defaultOptions } from './generics.model';

es6promise.polyfill()


export function Worker(
    newSlice,
    options = defaultOptions
) {
    function apiCall(path = '', data = {}, method = 'GET') {

        // let url = `https://localhost:5001${path}`;

        // if (process.env.NODE_ENV === 'production')
        let url = `https://tssnetcore.herokuapp.com/api${path}`;
        console.log(url)

        return fetch(url).then(res => res.json());
    }

    function* get() {
        try {
            yield put(mainLoader.actions.show())
            const req = {
                path: `/${newSlice.slice}`,
                method: 'get',
                headers: []
            };
            const res = yield apiCall(req.path)
            yield put(newSlice.actions.getSucceeded(res))
            if (options.withMainLoader)
                yield put(mainLoader.actions.hide())
            if (options.getSucceededMessage)
                yield put(notifier.actions.enqueue(
                    {
                        message: options.getSucceededMessage,
                        options: {
                            variant: 'success',
                        },
                    }
                ));

        } catch (err) {
            yield put(newSlice.actions.getFailed(err))
            yield put(mainLoader.actions.hide())
            const snack = {
                message: err,
                options: {
                    variant: 'danger',
                },
            }
            yield put(notifier.actions.enqueue(snack))
        }
    }

    return {
        get
    }
}

