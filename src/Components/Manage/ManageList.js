import React from 'react'
import { Icon, Text, ListItem, Left, Button, Body, Right } from 'native-base'

export default ({ onPress, text, color, icon }) => {
    return (
        <ListItem icon onPress={event => onPress ? onPress(event) : false}>
            <Left>
                <Button style={{ backgroundColor: color }}>
                    <Icon type="FontAwesome5" name={icon} />
                </Button>
            </Left>
            <Body>
                <Text>{text}</Text>
            </Body>
            <Right>
                <Icon active name="arrow-forward" />
            </Right>
        </ListItem>
    )
}