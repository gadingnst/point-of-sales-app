import React from 'react'
import { StyleSheet } from 'react-native'
import { Col } from 'react-native-easy-grid'
import { Card, CardItem, Button, Left, Thumbnail, Body, Text, Icon } from 'native-base'

export default ({ product }) => (
    <Col>
        <Card transparent style={styles.card}>
            <CardItem>
                <Left>
                    <Thumbnail source={{uri: 'Image URL'}} />
                    <Body>
                        <Text>Test Judul</Text>
                        <Text note>Oktober, 2019</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem>
                <Left>
                    <Button transparent textStyle={{ color: '#87838B' }}>
                        <Icon name="logo-github" />
                        <Text>1,926 stars</Text>
                    </Button>
                </Left>
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
    }
})