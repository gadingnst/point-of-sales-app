import React from 'react'
import { List } from 'native-base'
import Header from '../Components/Base/Header'
import ManageList from '../Components/Manage/ManageList'
import Color from '../Assets/Colors'

export default ({ navigation }) => {
    return (
        <>
            <Header title="Manage" gradientReverse />
            <List>
                <ManageList
                    icon="store"
                    color={Color.Primary}
                    text="Manage Product"
                    onPress={() => navigation.navigate('ManageProduct')}
                />
                <ManageList
                    icon="list"
                    color="#f27e7c"
                    text="Manage Category"
                    onPress={() => navigation.navigate('ManageCategory')}
                />
                <ManageList
                    icon="users"
                    color="#b07df0"
                    text="Manage User"
                    onPress={() => navigation.navigate('ManageUser')}
                />
            </List>
        </>
    )
}
