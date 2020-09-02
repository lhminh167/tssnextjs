// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// import createSagaMiddleware, { Task } from 'redux-saga'
// import { rootReducer } from './root.reducer'
// import rootSaga from './root.saga'
// import { rootInitialState } from './root.state'
// import { TssStore, IRootState } from './root.model'
// import { getStore } from '../../../modules/root/root.store'

// const dev = process.env.NODE_ENV !== 'production';

// export const makeStore = () => {
//     const sagaMiddleware = createSagaMiddleware();

//     const store: TssStore = configureStore({
//         reducer: rootReducer,
//         middleware: [...getDefaultMiddleware(), sagaMiddleware],
//         preloadedState: rootInitialState,
//         devTools: dev
//     })

//     store.sagaTask = sagaMiddleware.run(rootSaga);

//     return store
// }

// export const store = makeStore();

// export const state = getStore().getState() as IRootState;

export const cyDispatch = (action) => cy.window().its('store').invoke('dispatch', action);

export const cyGetState = (action) => cy.window().its('store').invoke('getState');

