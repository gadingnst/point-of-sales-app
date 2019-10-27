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
    const [loading, setLoading] = useState(false)

    const handleSave = () => {
        setLoading(true)
        let data = { name }
        return isEdit ? updateCategory(data) : createCategory(data)
    }

    const updateCategory = formData => {
        Http.put(`/api/category/${data.id}`, formData)
            .then(({ data: { data } }) => {
                Toast.show({
                    type: 'success',
                    text: 'Success updating new Category',
                    position: 'top'
                })
                navigation.navigate('ManageCategory', { data, type: 'update' })
            })
            .catch(({ response }) => {
                Toast.show({
                    type: 'danger',
                    text: response.data.message,
                    position: 'top'
                })
            })
            .finally(() => setLoading(false))
    }

    const createCategory = data => {
        Http.post('/api/category', data)
            .then(({ data: { data } }) => {
                Toast.show({
                    type: 'success',
                    text: 'Success creating new Category',
                    position: 'top'
                })
                navigation.navigate('ManageCategory', { data, type: 'create' })
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
            .finally(() => setLoading(false))
    }

    return (
        <>
            <Header
                title={isEdit ? 'Edit Category' : 'Add Category'}
                rightComponent={
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Text>Back</Text>
                    </Button>
                }
            />
            <Content>
                <Form style={{ padding: 5 }}>
                    <Item stackedLabel>
                        <Label>Category Name</Label>
                        <Input
                            value={name}
                            onChangeText={value => setName(value)}
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
                                <Text>
                                    {isEdit ? 'Update' : 'Create'} Category
                                </Text>
                            )}
                        </Button>
                    </View>
                </Form>
            </Content>
        </>
    )
}
