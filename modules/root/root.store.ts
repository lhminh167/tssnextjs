import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import createSagaMiddleware from 'redux-saga'
import { TssStore, IRootState } from './root.model'
import { rootReducer } from './root.reducer'
import rootSaga from './root.saga'
import { rootInitialState } from './root.state'

const dev = process.env.NODE_ENV !== 'production';

let store;

export const initStore = (preloadedState): TssStore => {
  const sagaMiddleware = createSagaMiddleware();

  const store: TssStore = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
    preloadedState,
    devTools: dev
  })

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export const initializeStore = (preloadedState = {}) => {
  let _store = store ?? initStore(preloadedState);
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...getStore().getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export function getStore() {
  return store;
}

export function getState(): IRootState {
  return getStore().getState();
}
