import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { API_BASEURL } from 'react-native-dotenv'

axios.defaults.baseURL = API_BASEURL || 'http://localhost:9600'

let getToken = async () => {
    try {
        const rootPersist = await AsyncStorage.getItem('persist:root')
        const authState = JSON.parse(rootPersist)
            ? JSON.parse(rootPersist).auth
            : '{}'
        const token = JSON.parse(authState).token
        axios.defaults.headers.common.authorization = `Bearer ${token}`
    } catch (err) {
        console.warn(err)
    }
}

getToken()

export default axios
