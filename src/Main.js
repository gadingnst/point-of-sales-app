import React from 'react'
import { useSelector } from 'react-redux'
import { Root, Container } from 'native-base'
import Navigator from './Navigator'
import Footer from './Components/Base/Footer'

let StartNavigator = null

export default () => {
    const isLoggedIn = useSelector(state => state.auth.loggedIn)
    
    if (!StartNavigator)
        StartNavigator = Navigator({ initialRouteName: isLoggedIn ? 'AuthNavigator' : 'GuestNavigator' })

    return (
        <Root>
            <Container>
                <StartNavigator />
            </Container>
            <Footer />
        </Root>
    )
}