import React from 'react'
import { StyleSheet } from 'react-native'
import { Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base'
import Gradient from 'react-native-linear-gradient'

export default props => {
    return (
        <>
            <Gradient
                style={{ ...styles.headerWrapper, height: '100%' }}
                colors={['#f27e7c', '#b07df0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0.1, 0.9]}
            >
                <Header transparent>
                    <Left style={{ flex: 1 }}>
                        <Button transparent>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title>{props.title}</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Button transparent>
                            <Text>Cancel</Text>
                        </Button>
                    </Right>
                </Header>
            </Gradient>
        </>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        elevation: 10
    }
})