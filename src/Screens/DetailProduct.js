import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Image, StyleSheet } from 'react-native'
import { H2, H3, Text, Button, View, Icon } from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { API_BASEURL } from 'react-native-dotenv'
import { addCart, removeCart } from '../Redux/Actions/Cart'
import Header from '../Components/Base/Header'
import Color from '../Assets/Colors'
import { rupiah } from '../Utils/Helpers'

export default ({ navigation }) => {
    const data = navigation.getParam('product')
    const imageUri = `${API_BASEURL}/files/image/product/${data.image}`
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
        <>
            <ParallaxScrollView
                backgroundColor="#b07df0"
                parallaxHeaderHeight={400}
                backgroundScrollSpeed={2}
                stickyHeaderHeight={80}
                renderFixedHeader={() => (
                    <Header
                        title={data.name}
                        rightComponent={
                            <Button
                                transparent
                                onPress={() => navigation.goBack()}>
                                <Text>Back</Text>
                            </Button>
                        }
                    />
                )}
                renderBackground={() => (
                    <Image
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain'
                        }}
                        source={{
                            uri: imageUri
                        }}
                    />
                )}
                renderForeground={() => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <H2 style={styles.title}>{data.name}</H2>
                    </View>
                )}>
                <View style={styles.content}>
                    <Image
                        source={{ uri: imageUri }}
                        style={{
                            alignSelf: 'center',
                            width: 200,
                            height: 200,
                            resizeMode: 'contain',
                            marginVertical: 20
                        }}
                    />
                    <H3 style={{ fontWeight: 'bold' }}>{data.name}</H3>
                    <Text>{data.Category.name}</Text>
                    <Text style={{ marginTop: 15 }}>{rupiah(data.price)}</Text>
                    <Text>{data.stock} stock leftt</Text>
                    <View style={styles.line} />
                    <Text>{data.description}</Text>
                    <Button
                        block
                        iconLeft
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
                        <Text>
                            {isExistsOnCart(data)
                                ? 'Remove From Cart'
                                : 'Add To Cart'}
                        </Text>
                    </Button>
                </View>
            </ParallaxScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    line: {
        width: '75%',
        height: 5,
        backgroundColor: '#ccc',
        marginVertical: 20
    },
    title: {
        color: '#fff',
        width: '100%',
        padding: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        fontSize: 22,
        textAlign: 'center'
    },
    content: {
        padding: 10,
        alignItems: 'center'
    },
    btnAction: {
        backgroundColor: Color.Info,
        padding: 0,
        marginVertical: 25,
        marginHorizontal: 5,
        borderRadius: 8
    }
})
