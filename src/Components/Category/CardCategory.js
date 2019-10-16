import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'native-base'

export default props => (
    <View style={styles.card}>
        <Text>{props.name}</Text>
    </View>
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