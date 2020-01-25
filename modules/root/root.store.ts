import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware, { Task } from 'redux-saga'

import { rootInitialState } from './root.state'
import { rootReducer } from './root.reducer'
import rootSaga from './root.saga'

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export type TssStore = ReturnType<typeof createStore> & {
    sagaTask: Task
}

function configureStore (initialState = rootInitialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store : TssStore = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore