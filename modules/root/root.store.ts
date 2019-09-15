import { applyMiddleware, createStore, StoreCreator } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { rootReducer } from './root.reducer';
import { rootInitialState } from './root.state';
import { rootWatcher } from './root.watcher';
import { reduxLogger } from '../shared/middlewares/redux-logger';
import { timeoutScheduler } from '../shared/middlewares/timeout-scheduler';
import { vanillaPromise } from '../shared/middlewares/vanilla-promise';
import { readyStatePromise } from '../shared/middlewares/ready-state-promise';
import { crashReporter } from '../shared/middlewares/crash-reporter';
import { thunk } from '../shared/middlewares/thunk';
import { rafScheduler } from '../shared/middlewares/raf-scheduler';
import { TssStore } from './root.model';
import { loaderHandler } from '../shared/middlewares/loader-handler';

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
        loaderHandler,
        // reduxLogger,
        // crashReporter
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
