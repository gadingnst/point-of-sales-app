import React from 'react'
import { useSelector } from 'react-redux'
import { Fab, Icon, Badge, Button, Text } from 'native-base'

export default ({ onPress }) => {
    const countCart = useSelector(state => state.cart.data.length)
    return (
        <>
            <Fab
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={event => onPress ? onPress(event) : false}
            >
                <Button badge vertical>
                    <Badge>
                        <Text>{countCart}</Text>
                    </Badge>
                    <Icon name="share" />
                </Button>
            </Fab>
        </>
    )
}