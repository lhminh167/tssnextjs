/* global fetch */

import { all, call, takeEvery } from 'redux-saga/effects';
import { crudWorker } from './crud.worker';
import * as ICrudModule from './crud.model';


export function crudWatcher(
    slice,
    extraWatcher = [],
    options = ICrudModule.defaultOptions,
    worker = crudWorker(
        slice,
        options
    )
) {

    function* get() {
        yield takeEvery(slice.actions.getPending, worker.get);
    }

    return [
        get,
        ...extraWatcher
    ]
}

export function* combineWatchers(watchers) {
    return yield all([
        ...watchers.map(w => call(w))
    ])
}
