import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../reducers'

const store = createStore(
  rootReducer,
  // compose(
  //   applyMiddleware(thunkMiddleware),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
  compose(
    applyMiddleware(thunkMiddleware)
  )
)

export default store
