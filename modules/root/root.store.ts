import { applyMiddleware, createStore, StoreCreator } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { rootReducer } from './root.reducer';
import { rootInitialState } from './root.state';
import { rootWatcher } from './root.watcher';
import { reduxLogger } from '../shared/middleware/redux-logger';
import { timeoutScheduler } from '../shared/middleware/timeout-scheduler';
import { vanillaPromise } from '../shared/middleware/vanilla-promise';
import { readyStatePromise } from '../shared/middleware/ready-state-promise';
import { crashReporter } from '../shared/middleware/crash-reporter';
import { thunk } from '../shared/middleware/thunk';
import { rafScheduler } from '../shared/middleware/raf-scheduler';
import { TssStore } from './root.model';

function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const bindMiddleware = middleware => {
        if (process.env.NODE_ENV !== 'production') {
            const { composeWithDevTools } = require('redux-devtools-extension');
            return composeWithDevTools(applyMiddleware(...middleware));
        }
        return applyMiddleware(...middleware);
    };

    const middlewares = [
        sagaMiddleware,
        // rafScheduler,
        // timeoutScheduler,
        // thunk,
        // vanillaPromise,
        // readyStatePromise,
        reduxLogger,
        crashReporter
    ];

    const store : TssStore = createStore(
        rootReducer,
        rootInitialState,
        bindMiddleware(middlewares)
    );

    store.sagaTask = sagaMiddleware.run(rootWatcher);

    return store;
}

export default configureStore;
