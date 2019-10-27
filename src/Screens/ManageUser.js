import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import {
    Text,
    Button,
    Content,
    View,
    Icon,
    List,
    Spinner,
    Toast
} from 'native-base'
import { NavigationEvents } from 'react-navigation'
import Header from '../Components/Base/Header'
import Http from '../Utils/Http'
import SimpleModal from '../Components/Base/SimpleModal'
import DataList from '../Components/Manage/DataList'
import Colors from '../Assets/Colors'

export default ({ navigation }) => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [loading, showLoading] = useState(false)
    const [modal, showModal] = useState(false)

    useEffect(() => {
        showLoading(true)
        Http.get('/api/user').then(({ data: { data } }) => {
            setUsers(data)
            showLoading(false)
        })
    }, [])

    const onScreenFocus = ({ data, type }) => {
        if (type === 'create') {
            setUsers([data, ...users])
        } else {
            const idx = users.findIndex(({ id }) => id === data.id)
            const newState = [...users]
            newState[idx] = data
            setUsers([...newState])
        }
    }

    const deleteUser = id => {
        showLoading(true)
        showModal(false)
        Http.delete(`/api/user/${id}`)
            .then(({ data: { data } }) => {
                Toast.show({
                    type: 'success',
                    text: `Success deleting user ${data.name}`,
                    position: 'top'
                })
                setUsers(users.filter(({ id }) => id !== data.id))
            })
            .catch(({ response }) => {
                Toast.show({
                    type: 'danger',
                    text: `Failed to deleting user: ${response.data.message}`,
                    position: 'top'
                })
            })
            .finally(() => {
                showLoading(false)
            })
    }

    return (
        <>
            <NavigationEvents
                onDidFocus={({ state }) =>
                    state.params ? onScreenFocus(state.params) : false
                }
            />
            <Header
                title="Manage User"
                rightComponent={
                    <Button
                        transparent
                        onPress={() => navigation.navigate('Manage')}>
                        <Text>Back</Text>
                    </Button>
                }
            />
            <SimpleModal
                text="Are you sure want delete this user ?"
                isVisible={modal}
                animationIn="zoomIn"
                animationInTiming={500}
                animationOut="zoomOut"
                actions={
                    <>
                        <Button
                            style={{
                                ...styles.btnModalAction,
                                backgroundColor: '#999'
                            }}
                            onPress={() => showModal(false)}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button
                            danger
                            style={{ ...styles.btnModalAction }}
                            onPress={() => deleteUser(currentUser.id)}>
                            {!loading || <Spinner color="#fff" />}
                            <Text>DELETE</Text>
                        </Button>
                    </>
                }
            />
            <Button
                block
                primary
                iconLeft
                onPress={() => navigation.navigate('FormUser')}>
                <Icon type="Entypo" name="add-user" />
                <Text>Add User</Text>
            </Button>
            {loading ? (
                <View
                    style={{
                        height: '100%',
                        flex: 1,
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}>
                    <Spinner color={Colors.Primary} size={140} />
                </View>
            ) : (
                <Content>
                    <List>
                        {users.map(item => (
                            <DataList
                                key={item.id}
                                title={item.name}
                                note={item.email}
                                onPressEdit={() =>
                                    navigation.navigate('FormUser', {
                                        data: item
                                    })
                                }
                                onPressDelete={() => {
                                    setCurrentUser(item)
                                    showModal(true)
                                }}
                            />
                        ))}
                    </List>
                </Content>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    btnModalAction: {
        borderRadius: 8,
        marginHorizontal: 5
    }
})
