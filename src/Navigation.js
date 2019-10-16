import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { zoomIn, fromRight } from 'react-navigation-transitions'
import Footer from './Components/Base/Footer'

import Home from './Screens/Home'
import History from './Screens/History'
import Manage from './Screens/Manage'
import Login from './Screens/Login'

const handleTransition = nav => {
    const prevScene = nav.scenes[nav.scenes.length - 2]
    const nextScene = nav.scenes[nav.scenes.length - 1]
    if (prevScene
        && prevScene.route.routeName === 'Login'
        && nextScene.route.routeName === 'Home') {
            return zoomIn()
    }
    return fromRight()
}

const opts = {
    headerMode: 'none',
    transitionConfig: nav => handleTransition(nav)
}

const AuthNavigation = {
    Home,
    Manage,
    History,
    Login
}

const GuestNavigation = { Home, Login }

const GuestNavigator = createStackNavigator(GuestNavigation, { ...opts, initialRouteName: 'Login' })
const AuthNavigator = createBottomTabNavigator(AuthNavigation, {
    ...opts,
    initialRouteName: 'Home',
    tabBarComponent: props => (
        <Footer {...props} />
    )
})

export default ({ initialRouteName }) => createAppContainer(createSwitchNavigator(
    { AuthNavigator, GuestNavigator },
    { initialRouteName }
))