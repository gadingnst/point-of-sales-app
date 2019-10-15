import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { zoomIn, fromRight } from 'react-navigation-transitions'
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

const Navigation = {
    Home,
    Login
}

const opts = {
    headerMode: 'none',
    transitionConfig: nav => handleTransition(nav)
}

const AuthNavigation = {
    ...Navigation,
    History,
    Manage
}

const GuestNavigation = { ...Navigation }

const AuthNavigator = createStackNavigator(AuthNavigation, { ...opts, initialRouteName: 'Home' })
const GuestNavigator = createStackNavigator(GuestNavigation, { ...opts, initialRouteName: 'Login' })

export default ({ initialRouteName }) => createAppContainer(createSwitchNavigator(
    { AuthNavigator, GuestNavigator },
    { initialRouteName }
))