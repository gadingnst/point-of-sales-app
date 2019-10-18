import React from 'react'
import { useSelector } from 'react-redux'
import { Root, Container } from 'native-base'
import Navigation from './Navigation'

export default () => {
    const isLoggedIn = useSelector(state => state.auth.loggedIn)

    const Navigator = Navigation({ initialRouteName: isLoggedIn ? 'auth' : 'guest' })

    return (
        <Root>
            <Container>
                <Navigator />
            </Container>
        </Root>
    )
}