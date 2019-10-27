import { combineReducers } from 'redux'
import auth from './Auth'
import cart from './Cart'
import product from './Product'

export default combineReducers({ auth, cart, product })
