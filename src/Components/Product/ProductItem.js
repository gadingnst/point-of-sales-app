import React from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-native-easy-grid'
import { Card, CardItem, Button, Left, Thumbnail, Body, Text, Icon, Right } from 'native-base'
import { API_BASEURL } from 'react-native-dotenv'
import { Facebook as Loader } from 'react-content-loader/native'
import { addCart, removeCart } from '../../Redux/Actions/Cart'
import { rupiah } from '../../Utils/Helpers'
import Color from '../../Assets/Colors'

export default ({ data, onView, onLoading }) => {
    const dispatch = useDispatch()
    const carts = useSelector(({ cart }) => cart.data)

    const isExistsOnCart = data => !!carts.find(({ id }) => id === data.id)

    const addToCart = data => {
        dispatch(addCart(data))
    }

    const removeFromCart = data => {
        dispatch(removeCart(data.id))
    }

    const handleCartPress = data => {
        if (!isExistsOnCart(data)) {
            addToCart(data)
        } else {
            removeFromCart(data)
        }
    }

    return (
        <Col>
            <Card transparent style={styles.card}>
                {onLoading ? (
                    <Loader
                        width={250}
                        style={{
                            padding: 8,
                            alignContent: 'center',
                            justifyContent: 'center'
                        }}
                    />
                ) : (
                    <>
                        <CardItem>
                            <Left>
                                <Thumbnail
                                    square
                                    style={{ borderRadius: 5 }}
                                    source={{
                                        uri: `${API_BASEURL}/files/image/product/${
                                            data.image
                                        }`
                                    }}
                                />
                                <Body>
                                    <Text>{data.name}</Text>
                                    <Text note>
                                        {data.Category
                                            ? data.Category.name
                                            : ''}
                                    </Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button
                                    transparent
                                    textStyle={{ color: '#87838B' }}>
                                    <Text>{rupiah(data.price)}</Text>
                                </Button>
                            </Left>
                            <Right style={styles.actionWrapper}>
                                <Button
                                    onPress={() => handleCartPress(data)}
                                    style={{
                                        ...styles.btnAction,
                                        backgroundColor: isExistsOnCart(data)
                                            ? Color.Warning
                                            : Color.Primary
                                    }}>
                                    <Icon
                                        type="MaterialIcons"
                                        name={
                                            isExistsOnCart(data)
                                                ? 'remove-shopping-cart'
                                                : 'shopping-cart'
                                        }
                                    />
                                </Button>
                                <Button
                                    onPress={() =>
                                        onView ? onView(data) : false
                                    }
                                    style={styles.btnAction}>
                                    <Icon name="eye" />
                                </Button>
                            </Right>
                        </CardItem>
                    </>
                )}
            </Card>
        </Col>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        elevation: 10,
        backgroundColor: '#fff',
        padding: 5
    },
    actionWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    btnAction: {
        backgroundColor: Color.Info,
        padding: 0,
        marginHorizontal: 5,
        borderRadius: 8
    }
})
