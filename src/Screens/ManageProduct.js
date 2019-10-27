import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { View, Toast, Text, Button, List, Content, Icon, Spinner } from 'native-base'
import { NavigationEvents } from 'react-navigation'
import { API_BASEURL } from 'react-native-dotenv'
import Header from '../Components/Base/Header'
import DataList from '../Components/Manage/DataList'
import Http from '../Utils/Http'
import { rupiah } from '../Utils/Helpers'
import SimpleModal from '../Components/Base/SimpleModal'
import Colors from '../Assets/Colors'

export default ({ navigation }) => {
    const [products, setProduct] = useState([])
    const [currentProduct, setCurrentProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [modal, showModal] = useState(false)

    useEffect(() => {
        setLoading(true)
        Http.get('/api/product').then(({ data: { data } }) => {
            setProduct(data.rows)
            setLoading(false)
        })
    }, [])

    const onScreenFocus = ({ data, type }) => {
        if (type === 'create') {
            setProduct([data, ...products])
        } else {
            const idx = products.findIndex(({ id }) => id === data.id)
            const newState = [...products]
            newState[idx] = data
            setProduct([...newState])
        }
    }

    const deleteProduct = id => {
        setLoading(true)
        showModal(false)
        Http.delete(`/api/product/${id}`)
            .then(({ data: { data } }) => {
                Toast.show({
                    type: 'success',
                    text: `Success deleting product ${data.name}`,
                    position: 'top'
                })
                setProduct(products.filter(({ id }) => id !== data.id))
            })
            .catch(({ response }) => {
                Toast.show({
                    type: 'danger',
                    text: `Failed to deleting product: ${
                        response.data.message
                    }`,
                    position: 'top'
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <NavigationEvents
                onDidFocus={({ state }) =>
                    state.params ? onScreenFocus(state.params) : false
                }
            />
            <Header
                title="Manage Product"
                rightComponent={
                    <Button
                        transparent
                        onPress={() => navigation.navigate('Manage')}>
                        <Text>Back</Text>
                    </Button>
                }
            />
            <SimpleModal
                text="Are you sure want delete product ?"
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
                            onPress={() => deleteProduct(currentProduct.id)}>
                            {!loading || <Spinner color="#fff" />}
                            <Text>DELETE</Text>
                        </Button>
                    </>
                }
            />
            <Button
                block
                primary
                iconLeft
                onPress={() => navigation.navigate('FormProduct')}>
                <Icon type="Entypo" name="add-to-list" />
                <Text>Add Product</Text>
            </Button>
            {loading ? (
                <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <Spinner color={Colors.Primary} size={140} />
                </View>
            ) : (
                <Content>
                    <List>
                        {products.map(item => (
                            <DataList
                                key={item.id}
                                image={`${API_BASEURL}/files/image/product/${
                                    item.image
                                }`}
                                title={item.name}
                                note={`${rupiah(item.price)} | x${item.stock}`}
                                onPressEdit={() =>
                                    navigation.navigate('FormProduct', {
                                        data: item
                                    })
                                }
                                onPressDelete={() => {
                                    showModal(true)
                                    setCurrentProduct(item)
                                }}
                            />
                        ))}
                    </List>
                </Content>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    btnModalAction: {
        borderRadius: 8,
        marginHorizontal: 5
    }
})
