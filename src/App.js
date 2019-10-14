import React from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import redux from  './Redux'
import Main from './Main'

const { store, persistor } = redux()

export default () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <SafeAreaView>
                <Main />
            </SafeAreaView>
        </PersistGate>
    </Provider>
)
