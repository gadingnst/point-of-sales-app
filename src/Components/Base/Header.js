import React from 'react'
import { StyleSheet } from 'react-native'
import { Header, View, Item, Body, Right, Icon, Title, Text, Input, Left } from 'native-base'
import Gradient from 'react-native-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler'
import CategoryCard from '../Category/CardCategory'

export default props => {
    const category = props.category || []
    if (props.homeBanner) {
        return (
            <>
                <Gradient
                    style={{ height: '100%' }}
                    colors={!props.gradientReverse ? ['#f27e7c', '#b07df0'] : ['#b07df0', '#f27e7c']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0.1, 0.9]}
                >
                    <View style={styles.formSearchWrapper}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Item rounded style={styles.search}>
                            <Input onFocus={props.onSearchbarFocus} placeholder='Search Product...'/>
                            <Icon name='search' />
                        </Item>
                    </View>
                    <View style={styles.categoryWrapper}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 20, backgroundColor: 'rgba(255, 255, 255, .15)' }}>
                        {category.map(item => (
                            <CategoryCard key={item.id} id={item.id} name={item.name} onPress={(event, id) => props.onPress ? props.onPress(event, id) : false} />
                        ))}
                        </ScrollView>
                    </View>
                </Gradient>
            </>
        )
    }
    return (
        <Gradient
            colors={!props.gradientReverse ? ['#f27e7c', '#b07df0'] : ['#b07df0', '#f27e7c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0.1, 0.9]}
        >
            <Header transparent>
                <Left style={{ flex: 1 }}>
                    { props.leftComponent || false }
                </Left>
                <Body style={{ flex: 1, alignItems: 'center' }}>
                    <Title>{props.title}</Title>
                </Body>
                <Right style={{ flex: 1 }}>
                    { props.rightComponent || false }
                </Right>
            </Header>
        </Gradient>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 20,
        fontWeight: 'bold',
        fontSize: 22
    },
    categoryWrapper: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    formSearchWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        paddingHorizontal: 30,
        paddingBottom: 35
    },
    search: {
        marginTop: 25,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        elevation: 5
    }
})