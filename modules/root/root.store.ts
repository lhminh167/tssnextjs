import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createStore } from 'redux'
import createSagaMiddleware, { Task } from 'redux-saga'
import { rootReducer } from './root.reducer'
import rootSaga from './root.saga'
import { rootInitialState } from './root.state'

export type TssStore = ReturnType<typeof createStore> & {
    sagaTask?: Task
}

const dev = process.env.NODE_ENV !== 'production';

export const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store: TssStore = configureStore({
        reducer: rootReducer,
        middleware: [...getDefaultMiddleware(), sagaMiddleware],
        preloadedState: rootInitialState,
        devTools: dev
    })

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store
}

export const store = makeStore();