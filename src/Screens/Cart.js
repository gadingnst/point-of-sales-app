import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Toast, View, Footer, Icon, Content, List, ListItem, Left, Thumbnail, Body, Right, Text, Button, Spinner } from 'native-base'
import { API_BASEURL } from 'react-native-dotenv'
import Header from '../Components/Base/Header'
import { increaseCartQty, decreaseCartQty, removeCart, clearCart } from '../Redux/Actions/Cart'
import { setProduct } from '../Redux/Actions/Product'
import { rupiah } from '../Utils/Helpers'
import Http from '../Utils/Http'
import Colors from '../Assets/Colors'
import SimpleModal from '../Components/Base/SimpleModal'

export default ({ navigation }) => {
    const dispatch = useDispatch()
    const carts = useSelector(({ cart }) => cart.data)
    const user = useSelector(({ auth }) => auth.user)
    const products = useSelector(({ product }) => product.data)
    const [modal, showModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const checkout = carts => {
        setLoading(true)
        const data = {
            user_id: user.id,
            amount: carts.reduce((acc, cur) => acc + cur.totalPrice, 0),
            receipt: String(Date.now()),
            orders: carts.map(item => ({
                product_id: item.id,
                quantity: item.qty,
                price: item.totalPrice
            }))
        }

        Http.post('/api/checkout', data)
            .then(({ data: { data } }) => {
                data.orders.forEach(order => {
                    const idx = products.findIndex(product => product.id === order.product_id)
                    if (idx > -1) {
                        const newState = [...products]
                        newState[idx].stock = newState[idx].stock - order.quantity
                        dispatch(setProduct(newState))
                    }
                })
                setLoading(false)
                showModal(false)
                dispatch(clearCart())
                navigation.navigate('Home')
                Toast.show({
                    type: 'success',
                    text: 'Success checkout!',
                    position: 'top'
                })
            })
            .catch(({ response }) => {
                setLoading(false)
                showModal(false)
                Toast.show({
                    type: 'danger',
                    text: response.data.message,
                    position: 'top'
                })
            })
    }

    return (
        <>
            <Header title="Cart" gradientReverse />
            <Content>
                {
                    !carts.length ||
                    <Button block danger iconLeft onPress={() => dispatch(clearCart())}>
                        <Icon type="FontAwesome" name="trash" />
                        <Text>Clear Cart</Text>
                    </Button>
                }
                <List>
                    {carts.map((item, idx) => (
                        <ListItem avatar key={item.id} style={{ flex: 1 }}>
                            <Left>
                                <Thumbnail square source={{ uri: `${API_BASEURL}/files/image/product/${item.image}` }} style={{ borderRadius: 10 }} />
                            </Left>
                            <Body style={{ flex: 2 }}>
                                <Text>{item.name}</Text>
                                <Text note>{rupiah(item.price)}</Text>
                            </Body>
                            <Right style={styles.actionWrapper}>
                                <TouchableOpacity onPress={() => dispatch(removeCart(item.id))} style={styles.btnQty}>
                                    <Icon type="FontAwesome" name="trash" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => dispatch(decreaseCartQty(idx))} style={styles.btnQty}>
                                    <Icon type="MaterialIcons" name="remove-circle-outline" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5 }}>
                                    <Text style={{ color: '#000' }}>{item.qty}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => dispatch(increaseCartQty(idx))} style={styles.btnQty}>
                                    <Icon type="MaterialIcons" name="add-circle-outline" />
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    ))}
                </List>
            </Content>
            <TouchableOpacity onPress={() => !carts.length || showModal(true)}>
                <Footer style={styles.checkoutContainer}>
                    {carts.length > 0
                        ? <View style={styles.checkout}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#fff' }}>Checkout Total:</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={styles.fontBold}>{rupiah(carts.reduce((acc, cur) => acc + cur.totalPrice, 0))}</Text>
                                </View>
                            </View>
                        : <Text style={styles.fontBold}>Cart is Empty!</Text>
                    }
                </Footer>
            </TouchableOpacity>
            <SimpleModal
                text="Are you sure want to checkout ?"
                isVisible={modal}
                animationIn="zoomIn"
                animationInTiming={500}
                animationOut="zoomOut"
                actions={(
                    <>
                        <Button  style={{ ...styles.btnModalAction, backgroundColor: '#999' }} onPress={() => showModal(false)}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button disabled={loading} primary style={{ ...styles.btnModalAction }} onPress={() => checkout(carts)}>
                            {!loading || <Spinner color="#fff" />}
                            <Text>Checkout</Text>
                        </Button>
                    </>
                )}
            />
        </>
    )
}

const styles = StyleSheet.create({
    actionWrapper: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    checkoutContainer: {
        backgroundColor: Colors.Primary,
        borderRadius: 25,
        margin: 10,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    checkout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    btnQty: {
        padding: 5
    },
    fontBold: {
        fontWeight: 'bold',
        color: '#fff'
    },
    btnModalAction: {
        borderRadius: 8,
        marginHorizontal: 5
    }
})