import React from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, Button } from 'native-base'
import { logout } from '../Redux/Actions/Auth'

export default ({ navigation }) => {
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
        navigation.replace('Login')
    }

    return (
        <>
            <View>
                <Button block onPress={() => onLogout()}>
                    <Text>Logout</Text>
                </Button>
                <Text>Hello from Home</Text>
            </View>
        </>
    )
}