import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text, Form, Input, Label, Item, Button, Card, Spinner, Toast } from 'native-base'
import Gradient from 'react-native-linear-gradient'
import { login } from '../Redux/Actions/Auth'
import Http from '../Utils/Http'

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        borderRadius: 15,
        padding: 20,
        marginTop: 30,
        opacity: 0.875,
        elevation: 4
    },
    inputValidateText: {
        fontSize: 11,
        color: 'crimson',
        textAlign: 'center'
    },
    welcomeText: {
        fontWeight: 'bold',
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 20,
        textAlign: 'center',
        fontSize: 22
    }
})

export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validEmail, setValidEmail] = useState(true)
    const [validPass, setValidPass] = useState(true)
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const handleEmailChange = val => {
        val = val.trim()
        setEmail(val)
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (pattern.test(val))
            setValidEmail(true)
        else
            setValidEmail(false)
    }

    const handlePassChange = pass => {
        setPassword(pass)
        if (pass.length > 5)
            setValidPass(true)
        else
            setValidPass(false)
    }

    const handleLogin = (email, password) => {
        dispatch(login({ email, password }))
            .then(({ value: { data } }) => {
                Http.defaults.headers.common['authorization'] = `Bearer ${data.token}`
                Toast.show({
                    text: 'Success Logged In!',
                    type: 'success'
                })
            })
            .catch(err => {
                Toast.show({
                    text: err.message === 'Network Error'
                        ? `Network Error: Your connection can't be established.`
                        : `Can't login, ${err.response.data.message}`,
                    type: 'danger'
                })
            })
    }

    return (
        <>
            <Gradient
                style={styles.content}
                colors={['#f27e7c', '#b07df0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0.1, 0.9]}
            >
                <ScrollView style={{ padding: 20 }}>
                    <View style={styles.welcomeWrapping}>
                        <Text style={styles.welcomeText}>
                            Welcome to
                        </Text>
                        <Text style={styles.welcomeText}>
                            Point of Sales App
                        </Text>
                    </View>
                    <Card style={styles.formContainer}>
                        <Form>
                            <Item stackedLabel>
                                <Label>Email</Label>
                                <Input value={email} onChangeText={value => handleEmailChange(value)} />
                            </Item>
                            { validEmail || <Text style={styles.inputValidateText}>Email must be a valid email!</Text> }
                            <Item stackedLabel>
                                <Label>Password</Label>
                                <Input value={password} onChangeText={value => handlePassChange(value)} secureTextEntry />
                            </Item>
                            { validPass || <Text style={styles.inputValidateText}>Password must not below 6 character length!</Text> }
                            <Button block onPress={() => handleLogin(email, password)} disabled={auth.isLoading || (!validEmail || !validPass)} style={{ borderRadius: 15, marginTop: 20 }}>
                                { auth.isLoading ? <Spinner color="#fb6340" /> : <Text>Login</Text> }
                            </Button>
                        </Form>
                    </Card>
                </ScrollView>
            </Gradient>
        </>
    )
}