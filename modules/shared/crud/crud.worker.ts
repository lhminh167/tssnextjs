/* global fetch */

import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import { put } from 'redux-saga/effects';
import { mainLoader } from '../loader/loader.redux';
import { notifier } from '../notifier/notifier.redux';
import * as ICrudModule from './crud.model';

es6promise.polyfill()


export function crudWorker(
    slice,
    options: ICrudModule.IOptions = ICrudModule.defaultOptions
) {
    async function apiCall(request: ICrudModule.IRequest) {

        // request.input = `https://localhost:5001${path}`;

        // if (process.env.NODE_ENV === 'production')
        request.input = `https://tssnetcore.herokuapp.com/api${request.input}`;

        const res = await fetch(request.input, request.init);
        return res.json();
    }

    function* get(action) {
        try {
            if (options.withMainLoader) yield put(mainLoader.actions.show());
            const res = yield apiCall({
                input: `/${slice.slice}${action && action.payload ? action.payload : ''}`
            });
            yield put(slice.actions.getSucceeded(res));
            yield put(mainLoader.actions.hide());
            if (options.getSucceededMessage)
                yield put(notifier.actions.enqueue({
                    message: options.getSucceededMessage,
                    options: { variant: 'success' },
                }));
        } catch (err) {
            yield put(slice.actions.getFailed(err))
            yield put(mainLoader.actions.hide())
            yield put(notifier.actions.enqueue({
                message: err,
                options: { variant: 'danger' }
            }))
        }
    }

    return {
        get
    }
}

