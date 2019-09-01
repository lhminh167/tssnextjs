/* global fetch */

import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import { put } from 'redux-saga/effects';
import { mainLoader } from '../loader/loader.redux';
import { notifier } from '../notifier/notifier.redux';
import { IOptions, defaultOptions, IRequest, IResponse, IAction } from './crud.model';

es6promise.polyfill()


export function crudWorker(
    slice,
    options: IOptions = defaultOptions
) {

    async function apiCall(request: IRequest) {

        // request.input = `https://localhost:5001${path}`;

        // if (process.env.NODE_ENV === 'production')
        request.input = `https://tssnetcore.herokuapp.com/api${request.input}`;

        const res = await fetch(request.input, request.init);
        return res.json();
    }

    function* get(action: IAction)
    {
        try
        {
            if (options.withMainLoader) yield put(mainLoader.actions.show());

            const res = yield apiCall({
                input: `/${slice.slice}${action && action.payload ? action.payload : ''}`
            });

            yield put(slice.actions.getSucceeded(res));
        }
        catch (err)
        {
            yield put(slice.actions.getFailed(err))

        }
        finally
        {
            if (action.payload.title)
                yield put(notifier.actions.enqueue({
                    message: options.getSucceededMessage,
                    options: { variant: 'success' },
                }));

            // if (options.withMainLoader)
                yield put(mainLoader.actions.hide())
        }
        finally
        {
            if (action.title)
                yield put(notifier.actions.enqueue({
                    message: options.getSucceededMessage,
                    options: { variant: 'success' },
                }));
        }
    }

    return {
        get
    }
}

