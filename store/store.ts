import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root/root.reducer';
import { rootInitialState } from './root/root.state';
import { rootWatcher } from './root/root.watcher';

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore() {

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    rootInitialState,
    bindMiddleware([sagaMiddleware])
  )

  store.sagaTask = sagaMiddleware.run(rootWatcher)

  return store
}

export default configureStore
