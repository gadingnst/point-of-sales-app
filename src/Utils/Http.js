import axios from 'axios'
import { AsyncStorage } from 'react-native'

let auth, token

try {
    auth = JSON.parse(AsyncStorage.getItem('persist:root')).auth
    token = JSON.parse(auth).token
} catch (err) {
    token = null
}

axios.defaults.baseURL = process.env.API_BASEURL || 'http://localhost:9600'
axios.defaults.headers.common['authorization'] = `Bearer ${token}`

export default axios