// import { createStore, compose, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'

// import rootReducer from '../reducers'

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunkMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
//   // compose(
//   //   applyMiddleware(thunkMiddleware)
//   // )
// )

// export default store

// persistRedux 
import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import rootReducer from '../reducers'

const persistConfig = {
	key: 'root',
	storage: storage,
	stateReconciler: autoMergeLevel2,
  whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  // applyMiddleware(thunkMiddleware)
);
export const persistor = persistStore(store);