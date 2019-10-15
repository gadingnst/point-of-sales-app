import React from 'react'
import { useSelector } from 'react-redux'
import { Root, Container } from 'native-base'
import Navigator from './Navigator'

const { AuthNavigator, GuestNavigator } = Navigator()

export default () => {
    const isLoggedIn = useSelector(state => state.auth.loggedIn)
    return (
        <Root>
            <Container>
                {isLoggedIn ? <AuthNavigator /> : <GuestNavigator />}
            </Container>
        </Root>
    )
}