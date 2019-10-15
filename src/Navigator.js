import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from './Screens/Home'
import History from './Screens/History'
import Manage from './Screens/Manage'
import Login from './Screens/Login'

const Navigation = {
    Home,
    History,
    Manage,
    Login
}

const opts = {
    headerMode: 'none',
    initialRouteName: 'Login'
}

export default createAppContainer(createStackNavigator(Navigation, opts))