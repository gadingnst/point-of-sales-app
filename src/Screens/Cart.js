import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { View, Footer, Icon, Content, List, ListItem, Left, Thumbnail, Body, Right, Text, Button } from 'native-base'
import { API_BASEURL } from 'react-native-dotenv'
import Header from '../Components/Base/Header'
import { increaseCartQty, decreaseCartQty, removeCart, clearCart } from '../Redux/Actions/Cart'
import { rupiah } from '../Utils/Helpers'
import Colors from '../Assets/Colors'

export default ({ navigation }) => {
    const dispatch = useDispatch()
    const carts = useSelector(({ cart }) => cart.data)

    return (
        <>
            <Header
                title="Cart"
                rightComponent={(
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Text>Back</Text>
                    </Button>
                )}
            />
            <Content>
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
            <TouchableOpacity onPress={() => false}>
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
    }
})