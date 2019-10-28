import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
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
import Checkout from './Screens/Checkout'
import ManageProduct from './Screens/ManageProduct'
import ManageCategory from './Screens/ManageCategory'
import ManageUser from './Screens/ManageUser'
import FormProduct from './Screens/FormProduct'
import FormCategory from './Screens/FormCategory'
import FormUser from './Screens/FormUser'

const handleTransition = nav => {
    const prevScene = nav.scenes[nav.scenes.length - 2]
    const nextScene = nav.scenes[nav.scenes.length - 1]
    if (
        prevScene &&
        prevScene.route.routeName === 'Login' &&
        nextScene.route.routeName === 'Home'
    ) {
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
        screen: createStackNavigator(
            {
                Home,
                DetailProduct,
                Search
            },
            {
                initialRouteName: 'Home',
                headerMode: 'none'
            }
        )
    },
    Manage: {
        screen: createStackNavigator(
            {
                Manage,
                ManageCategory: {
                    screen: createStackNavigator(
                        {
                            ManageCategory,
                            FormCategory
                        },
                        {
                            initialRouteName: 'ManageCategory',
                            headerMode: 'none'
                        }
                    )
                },
                ManageUser: {
                    screen: createStackNavigator(
                        {
                            ManageUser,
                            FormUser
                        },
                        {
                            initialRouteName: 'ManageUser',
                            headerMode: 'none'
                        }
                    )
                },
                ManageProduct: {
                    screen: createStackNavigator(
                        {
                            ManageProduct,
                            FormProduct
                        },
                        {
                            initialRouteName: 'ManageProduct',
                            headerMode: 'none'
                        }
                    )
                }
            },
            {
                initialRouteName: 'Manage',
                headerMode: 'none',
                transitionConfig: () => fromRight()
            }
        )
    },
    History: {
        screen: History
    },
    Cart: {
        screen: createStackNavigator(
            {
                Cart,
                Checkout
            },
            {
                headerMode: 'none',
                initialRouteName: 'Cart'
            }
        )
    },
    Account: {
        screen: createStackNavigator(
            {
                Account,
                Login
            },
            {
                headerMode: 'none',
                initialRouteName: 'Account'
            }
        )
    }
}

const GuestNavigation = { Home, Login }

const GuestNavigator = createStackNavigator(GuestNavigation, {
    ...opts,
    initialRouteName: 'Login'
})

const AuthNavigator = createBottomTabNavigator(AuthNavigation, {
    ...opts,
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarComponent: props => <Footer {...props} />
})

export const AuthNav = createAppContainer(AuthNavigator)
export const GuestNav = createAppContainer(GuestNavigator)

export default {
    AuthNav: createAppContainer(AuthNavigator),
    GuestNav: createAppContainer(GuestNavigator)
}
