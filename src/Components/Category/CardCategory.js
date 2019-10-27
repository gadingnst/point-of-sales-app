import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from 'native-base'

export default props => (
    <TouchableOpacity
        onPress={() => (props.onPress ? props.onPress(props.id) : false)}>
        <View style={styles.card}>
            <Text>{props.name}</Text>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        padding: 20,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        elevation: 10
    }
})
