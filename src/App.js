import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { API_BASEURL } from 'react-native-dotenv'

const App = () => {
    return (
        <>
            <SafeAreaView>
                <View>
                    <Text>Hello World {API_BASEURL}</Text>
                </View>
            </SafeAreaView>
        </>
    )
}

export default App
