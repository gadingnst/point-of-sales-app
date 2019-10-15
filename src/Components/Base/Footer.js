import React from 'react'
import { Footer, FooterTab, Button, Icon } from 'native-base'
import Colors from '../../Assets/Colors'

export default () => {
    return (
        <Footer>
            <FooterTab style={{ backgroundColor: Colors.Primary }}>
                <Button active>
                    <Icon type="FontAwesome" name="th-large" />
                </Button>
                <Button>
                    <Icon type="FontAwesome" name="pencil-square" />
                </Button>
                <Button>
                    <Icon type="FontAwesome" name="line-chart" />
                </Button>
                <Button>
                    <Icon type="FontAwesome" name="sign-out" />
                </Button>
            </FooterTab>
        </Footer>
    )
}