import React from 'react'
import { Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base'

export default props => {
    
    return (
        <Header transparent>
            <Left>
                <Button transparent>
                    <Icon name="arrow-back" />
                </Button>
            </Left>
            <Body>
                <Title>Transparent</Title>
            </Body>
            <Right>
                <Button transparent>
                    <Text>Cancel</Text>
                </Button>
            </Right>
        </Header>
    )
}