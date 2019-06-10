/* global fetch */

import { all, call, takeEvery } from 'redux-saga/effects';
import { Worker } from './generics.worker';
import { defaultOptions } from './generics.model';



export function Watcher(
    newSlice,
    extraWatcher = [],
    options = defaultOptions,
    worker = Worker(
        newSlice,
        options
    )
) {

    function* get() {
        yield takeEvery(newSlice.actions.getPending, worker.get);
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
