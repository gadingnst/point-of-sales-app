import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import rootReducers from './Reducers'

const config = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2
}

const reducers = persistReducer(config, rootReducers)
const store = createStore(reducers, applyMiddleware(createLogger(), promiseMiddleware))
const persistor = persistStore(store)

export default () => ({ store, persistor })