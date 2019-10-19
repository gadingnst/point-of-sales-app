import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Root } from 'native-base'
import Main from './Main'
import redux from  './Redux'

const { store, persistor } = redux()

export default () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Root>
                    <Main />
                </Root>
            </PersistGate>
        </Provider>
    )
}