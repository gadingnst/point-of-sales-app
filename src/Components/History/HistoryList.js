import React from 'react'
import { ListItem, Thumbnail, Body, Left, Text, Right } from 'native-base'
import { API_BASEURL } from 'react-native-dotenv'
import { rupiah } from '../../Utils/Helpers'

export default ({ data, onView }) => (
    <ListItem avatar onPress={() => (onView ? onView(data) : false)}>
        <Left>
            <Thumbnail
                source={{
                    uri: `${API_BASEURL}/files/image/product/${!data
                        .Orders[0] || data.Orders[0].Product.image}`
                }}
            />
        </Left>
        <Body>
            <Text>Receipt: #{data.receipt}</Text>
            <Text note>{rupiah(data.amount)}</Text>
        </Body>
        <Right>
            <Text note>x{data.Orders.length}</Text>
        </Right>
    </ListItem>
)
