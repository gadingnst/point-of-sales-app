import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'

export default props => (
    <Modal
        isVisible={props.isVisible}
        animationIn={props.animationIn}
        animationOut={props.animationOut}
        animationInTiming={props.animationInTiming}>
        <View style={styles.modal}>
            <Text style={styles.text}>{props.text}</Text>
            <View style={styles.modalActionWrapper}>{props.actions}</View>
        </View>
    </Modal>
)

const styles = StyleSheet.create({
    text: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16
    },
    modalActionWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: -60,
        bottom: 0
    },
    modal: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        height: 125
    }
})
