import React, { useState, useEffect } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Spinner, Toast, Text, Button, Content, Form, Item, Label, Input, Textarea, Picker, View } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import Header from '../Components/Base/Header'
import Http from '../Utils/Http'

export default ({ navigation }) => {
    const data = navigation.getParam('data') || {}
    const isEdit = !!Object.keys(data).length
    const [name, setName] = useState(data.name || '')
    const [category, setCategory] = useState(data.Category ? data.Category.id : '')
    const [price, setPrice] = useState(data.price || 0)
    const [stock, setStock] = useState(data.stock || 1)
    const [description, setDescription] = useState(data.description || '')
    const [image, setImage] = useState(null)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const imagePicker = () => {
        setLoading(true)
        const opts = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }
        ImagePicker.launchImageLibrary(opts, res => {
            if (res.didCancel) {}
            else if (res.customButton) {}
            else if (res.error) {
                Toast.show({
                    type: 'danger',
                    text: `An error occured while select image: ${res.error}`
                })
            } else {
                setImage({
                    uri: res.uri,
                    type: res.type,
                    name: res.fileName
                })
                return setLoading(false)
            }
            setImage(image)
            setLoading(false)
        })
    }

    const handleSave = () => {
        setLoading(true)
        let data = { name, category, price, stock, description }
        data = image ? { ...data, image } : data
        const fd = new FormData()
        for (const key in data) {
            if (key === 'image') {
                fd.append(key, data[key], data[key].name)
            } else {
                fd.append(key, data[key])
            }
        }
        return isEdit ? updateProduct(fd) : createProduct(fd)
    }

    const updateProduct = formData => {
        Http.put(`/api/product/${data.id}`, formData)
            .then(({ data: { data } }) => {
                Toast.show({
                    type: 'success',
                    text: 'Success updating new Product',
                    position: 'top'
                })
                navigation.navigate('ManageProduct', { data, type: 'update' })
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

    const createProduct = data => {
        Http.post('/api/product', data)
            .then(({ data: { data } }) => {
                Toast.show({
                    type: 'success',
                    text: 'Success creating new Product',
                    position: 'top'
                })
                navigation.navigate('ManageProduct', { data, type: 'create' })
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

    useEffect(() => {
        setLoading(true)
        Http.get('/api/category')
            .then(({ data: { data } }) => {
                setCategories(data)
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <Header
                title={isEdit ? "Edit Product" : "Add Product"}
                rightComponent={(
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Text>Back</Text>
                    </Button>
                )}
            />
            <Content>
                <Form style={{ padding: 5 }}>
                    <Item stackedLabel>
                        <Label>Product Name</Label>
                        <Input value={name} onChangeText={value => setName(value)} />
                    </Item>
                    <Text style={{ padding: 15 }}>Product Category</Text>
                    <Item picker style={{ paddingHorizontal: 8 }}>
                        <Picker
                            mode="dropdown"
                            placeholder="Select Product Category"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={!!category.length ? category : null}
                            onValueChange={value => setCategory(value)}
                        >
                            {categories.map(item => (
                                <Picker.Item key={item.id} label={item.name} value={item.id} />
                            ))}
                        </Picker>
                    </Item>
                    <Item stackedLabel>
                        <Label>Product Price</Label>
                        <Input value={String(price)} onChangeText={value => setPrice(Number(value))} keyboardType="number-pad" />
                    </Item>
                    <Item stackedLabel>
                        <Label>Product Stock</Label>
                        <Input value={String(stock)} onChangeText={value => setStock(Number(value))} keyboardType="number-pad" />
                    </Item>
                    <View style={{ paddingHorizontal: 8 }}>
                        <Textarea value={description} onChangeText={value => setDescription(value)} rowSpan={5} bordered placeholder="Product Description" />
                        <Text style={{ marginVertical: 8 }}>Product Image (Optional)</Text>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => imagePicker()}>
                                <Image
                                    style={{ width: 120, height: 120, borderRadius: 10 }}
                                    source={image ? { uri: image.uri } : require('../Assets/Image/placeholder.png') }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ padding: 15 }}>
                        <Button disabled={loading} primary block style={{ borderRadius: 10 }} onPress={() => handleSave()}>
                            {
                                loading
                                    ? <Spinner color="#fb6340" />
                                    : <Text>{isEdit ? 'Update' : 'Create'} Product</Text>
                            }
                        </Button>
                    </View>
                </Form>
            </Content>
        </>
    )
}