import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { rootReducer } from './root.reducer';
import { rootInitialState } from './root.state';
import { rootWatcher } from './root.watcher';

export type TssStore = ReturnType<typeof createStore> & {
    sagaTask: Task;
};

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
}

function configureStore() {

    const sagaMiddleware = createSagaMiddleware();

    const store : TssStore = createStore(
        rootReducer,
        rootInitialState,
        bindMiddleware([sagaMiddleware])
    );

    store.sagaTask = sagaMiddleware.run(rootWatcher);

    return store;
}

export default configureStore;
