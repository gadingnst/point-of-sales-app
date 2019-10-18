import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Text, ListItem, Left, Thumbnail, Body, Right } from 'native-base'

export default props => (
    <ListItem thumbnail>       
        {!props.image || 
            <Left>
                <Thumbnail square source={{ uri: props.image  }} />
            </Left>
        }
        <Body>
            <Text>{props.title}</Text>
            <Text note>{props.note}</Text>
        </Body>
        <Right style={styles.actionWrapper}>
            <TouchableOpacity style={styles.action}>
                <Icon type="MaterialIcons" name="edit" onPress={event => props.onPressEdit ? props.onPressEdit(event) : false} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={event => props.onPressDelete ? props.onPressDelete(event) : false}>
                <Icon type="MaterialIcons" name="delete" />
            </TouchableOpacity>
        </Right>
    </ListItem>
)

const styles = StyleSheet.create({
    action: {
        padding: 10
    },
    actionWrapper: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row'
    }
})