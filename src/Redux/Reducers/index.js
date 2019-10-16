import { combineReducers } from 'redux'
import auth from './Auth'
import product from './Product'

export default combineReducers({ auth, product })