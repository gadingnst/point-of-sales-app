import React from 'react'
import { useSelector } from 'react-redux'
import { Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base'
import Colors from '../../Assets/Colors'

export default props => {
    const nav = props.navigation
    const countCart = useSelector(({ cart }) => cart.data.length)

    return (
        <>
            <Footer>
                <FooterTab style={{ backgroundColor: Colors.Primary }}>
                    <Button onPress={() => nav.navigate('Home')} active={nav.state.index === 0}>
                        <Icon type="FontAwesome" name="th-large" />
                    </Button>
                    <Button onPress={() => nav.navigate('Manage')} active={nav.state.index === 1}>
                        <Icon type="FontAwesome" name="pencil-square" />
                    </Button>
                    <Button onPress={() => nav.navigate('History')} active={nav.state.index === 2}>
                        <Icon type="FontAwesome" name="line-chart" />
                    </Button>
                    <Button badge onPress={() => nav.navigate('Cart')} active={nav.state.index === 3}>
                        <Badge><Text>{countCart}</Text></Badge>
                        <Icon name="cart" />
                    </Button>
                    <Button onPress={() => nav.navigate('Account')} active={nav.state.index === 4}>
                        <Icon type="FontAwesome" name="user" />
                    </Button>
                </FooterTab>
            </Footer>
        </>
    )
}