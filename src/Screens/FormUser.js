import React, { useState } from 'react'
import {
    Spinner,
    Toast,
    Text,
    Button,
    Content,
    Form,
    Item,
    Label,
    Input,
    View
} from 'native-base'
import Header from '../Components/Base/Header'
import Http from '../Utils/Http'

export default ({ navigation }) => {
    const data = navigation.getParam('data') || {}
    const isEdit = !!Object.keys(data).length
    const [name, setName] = useState(data.name || '')
    const [email, setEmail] = useState(data.email || '')
    const [password, setPassword] = useState('')
    const [loading, showLoading] = useState(false)

    const handleSave = () => {
        showLoading(true)
        let data =
            password.length > 0 ? { name, email, password } : { name, email }
        return isEdit ? updateUser(data) : createUser(data)
    }

    const updateUser = formData => {
        Http.put(`/api/user/${data.id}`, formData)
            .then(({ data: { data } }) => {
                Toast.show({
                    type: 'success',
                    text: 'Success updating user',
                    position: 'top'
                })
                navigation.navigate('ManageUser', { data, type: 'update' })
            })
            .catch(({ response }) => {
                Toast.show({
                    type: 'danger',
                    text: response.data.message,
                    position: 'top'
                })
            })
            .finally(() => showLoading(false))
    }

    const createUser = data => {
        Http.post('/api/user', data)
            .then(({ data: { data } }) => {
                Toast.show({
                    type: 'success',
                    text: 'Success creating new user',
                    position: 'top'
                })
                navigation.navigate('ManageUser', { data, type: 'create' })
            })
            .catch(err => {
                Toast.show({
                    text:
                        err.message === 'Network Error'
                            ? "Network Error: Your connection can't be established."
                            : `${err.response.data.message}`,
                    type: 'danger',
                    position: 'top'
                })
            })
            .finally(() => showLoading(false))
    }

    return (
        <>
            <Header
                title={isEdit ? 'Edit User' : 'Add User'}
                rightComponent={
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Text>Back</Text>
                    </Button>
                }
            />
            <Content>
                <Form style={{ padding: 5 }}>
                    <Item stackedLabel>
                        <Label>Name</Label>
                        <Input
                            value={name}
                            onChangeText={value => setName(value)}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input
                            value={email}
                            onChangeText={value => setEmail(value)}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry
                            value={password}
                            onChangeText={value => setPassword(value)}
                        />
                    </Item>
                    <View style={{ padding: 15 }}>
                        <Button
                            disabled={loading}
                            primary
                            block
                            style={{ borderRadius: 10 }}
                            onPress={() => handleSave()}>
                            {loading ? (
                                <Spinner color="#fb6340" />
                            ) : (
                                <Text>{isEdit ? 'Update' : 'Create'} User</Text>
                            )}
                        </Button>
                    </View>
                </Form>
            </Content>
        </>
    )
}
