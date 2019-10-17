import React from 'react'
import { useSelector } from 'react-redux'
import { Root, Container, Drawer } from 'native-base'
import Navigation from './Navigation'

let StartNavigator = null

export default () => {
    const isLoggedIn = useSelector(state => state.auth.loggedIn)
    
    if (!StartNavigator)
        StartNavigator = Navigation({ initialRouteName: isLoggedIn ? 'AuthNavigator' : 'GuestNavigator' })

    return (
        <Root>
            <Container>
                <StartNavigator />
            </Container>
        </Root>
    )
}