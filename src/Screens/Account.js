import React, { useState } from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Text, View, Button } from 'native-base'
import { logout } from '../Redux/Actions/Auth'
import Header from '../Components/Base/Header'
import SimpleModal from '../Components/Base/SimpleModal'

export default ({ navigation }) => {
    const dispatch = useDispatch()
    const user = useSelector(({ auth }) => auth.user)
    const [modal, showModal] = useState(false)

    const onLogout = () => {
        dispatch(logout())
        showModal(false)
        AsyncStorage.clear()
        navigation.replace('Login')
    }

    return (
        <>
            <Header title="Account" />
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                <Text style={{ textAlign: 'center' }}>Halo, {user.name}..</Text>
                <Text style={{ textAlign: 'center' }}>
                    Are want to Logout ?
                </Text>
                <Button
                    block
                    onPress={() => showModal(true)}
                    style={{ margin: 15, borderRadius: 10 }}>
                    <Text>Logout</Text>
                </Button>
            </View>
            <SimpleModal
                text="Are you sure want to logout ?"
                isVisible={modal}
                animationIn="zoomIn"
                animationInTiming={500}
                animationOut="zoomOut"
                actions={
                    <>
                        <Button
                            style={{
                                ...styles.btnModalAction,
                                backgroundColor: '#999'
                            }}
                            onPress={() => showModal(false)}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button
                            danger
                            style={{ ...styles.btnModalAction }}
                            onPress={() => onLogout()}>
                            <Text>Log Out</Text>
                        </Button>
                    </>
                }
            />
        </>
    )
}

const styles = StyleSheet.create({
    btnModalAction: {
        borderRadius: 8,
        marginHorizontal: 5
    }
})
