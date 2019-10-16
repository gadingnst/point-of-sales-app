import React from 'react'
import { Footer, FooterTab, Button, Icon } from 'native-base'
import Colors from '../../Assets/Colors'

export default props => {
    const nav = props.navigation
    return (
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
                <Button>
                    <Icon type="FontAwesome" name="sign-out" />
                </Button>
            </FooterTab>
        </Footer>
    )
}