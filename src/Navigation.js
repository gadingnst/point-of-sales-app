import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { zoomIn, fromRight } from 'react-navigation-transitions'
import Footer from './Components/Base/Footer'

import Home from './Screens/Home'
import Account from './Screens/Account'
import Cart from './Screens/Cart'
import Search from './Screens/Search'
import History from './Screens/History'
import Manage from './Screens/Manage'
import Login from './Screens/Login'
import DetailProduct from './Screens/DetailProduct'

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
    Home: {
        screen: Home
    },
    Manage: {
        screen: Manage
    },
    History: {
        screen: History
    },
    Cart: {
        screen: Cart
    },
    Account: {
        screen: Account
    },
    DetailProduct,
    Search,
    Login
}

const GuestNavigation = { Home, Login }

const GuestNavigator = createStackNavigator(GuestNavigation, { ...opts, initialRouteName: 'Login' })
const AuthNavigator = createMaterialTopTabNavigator(AuthNavigation, {
    ...opts,
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarComponent: props => (
        <Footer {...props} />
    )
})

export default ({ initialRouteName }) => createAppContainer(createSwitchNavigator(
    { AuthNavigator, GuestNavigator },
    { initialRouteName }
))