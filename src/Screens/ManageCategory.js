import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import {
    View,
    Toast,
    Text,
    Button,
    List,
    Content,
    Icon,
    Spinner
} from 'native-base'
import { NavigationEvents } from 'react-navigation'
import Header from '../Components/Base/Header'
import DataList from '../Components/Manage/DataList'
import Http from '../Utils/Http'
import SimpleModal from '../Components/Base/SimpleModal'
import Colors from '../Assets/Colors'

export default ({ navigation }) => {
    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState({})
    const [loading, setLoading] = useState(false)
    const [modal, showModal] = useState(false)

    useEffect(() => {
        setLoading(true)
        Http.get('/api/category').then(({ data: { data } }) => {
            setCategories(data)
            setLoading(false)
        })
    }, [])

    const onScreenFocus = ({ data, type }) => {
        if (type === 'create') {
            setCategories([data, ...categories])
        } else {
            const idx = categories.findIndex(({ id }) => id === data.id)
            const newState = [...categories]
            newState[idx] = data
            setCategories([...newState])
        }
    }

    const deleteCategory = id => {
        setLoading(true)
        showModal(false)
        Http.delete(`/api/category/${id}`)
            .then(({ data: { data } }) => {
                Toast.show({
                    type: 'success',
                    text: `Success deleting category ${data.name}`,
                    position: 'top'
                })
                setCategories(categories.filter(({ id }) => id !== data.id))
            })
            .catch(({ response }) => {
                Toast.show({
                    type: 'danger',
                    text: `Failed to deleting category: ${
                        response.data.message
                    }`,
                    position: 'top'
                })
            })
            .finally(() => {
                setLoading(false)
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
                title="Manage Category"
                rightComponent={
                    <Button
                        transparent
                        onPress={() => navigation.navigate('Manage')}>
                        <Text>Back</Text>
                    </Button>
                }
            />
            <SimpleModal
                text="Are you sure want delete category ?"
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
                            onPress={() => deleteCategory(currentCategory.id)}>
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
                onPress={() => navigation.navigate('FormCategory')}>
                <Icon type="Entypo" name="add-to-list" />
                <Text>Add Category</Text>
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
                        {categories.map(item => (
                            <DataList
                                key={item.id}
                                title={item.name}
                                onPressEdit={() =>
                                    navigation.navigate('FormCategory', {
                                        data: item
                                    })
                                }
                                onPressDelete={() => {
                                    showModal(true)
                                    setCurrentCategory(item)
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
