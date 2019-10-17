import React from 'react'
import { StyleSheet } from 'react-native'
import { Col } from 'react-native-easy-grid'
import { Card, CardItem, Button, Left, Thumbnail, Body, Text, Icon, Right } from 'native-base'
import { API_BASEURL } from 'react-native-dotenv'
import { rupiah } from '../../Utils/Helpers'
import Color from '../../Assets/Colors'

export default ({ data, onAddToCart, onView }) => (
    <Col>
        <Card transparent style={styles.card}>
            <CardItem>
                <Left>
                    <Thumbnail square style={{ borderRadius: 5 }} source={{ uri: `${API_BASEURL}/files/image/product/${data.image}` }} />
                    <Body>
                        <Text>{data.name}</Text>
                        <Text note>{data.Category ? data.Category.name : ''}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem>
                <Left>
                    <Button transparent textStyle={{ color: '#87838B' }}>
                        <Text>{rupiah(data.price)}</Text>
                    </Button>
                </Left>
                <Right style={styles.actionWrapper}>
                    <Button onPress={event => onAddToCart ? onAddToCart(event, data) : false} style={{ ...styles.btnAction, backgroundColor: '#f27e7c' }}>
                        <Icon name="cart" />
                    </Button>
                    <Button onPress={event => onView ? onView(event, data) : false} style={styles.btnAction}>
                        <Icon name="eye" />
                    </Button>
                </Right>
            </CardItem>
        </Card>
    </Col>
)

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