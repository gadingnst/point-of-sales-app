import React from 'react'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { Text, Button } from 'native-base'
import Header from '../Components/Base/Header'

export default ({ navigation }) => {
    const data = navigation.getParam('product')
    return (
        <>
            <Header
                title={data.name}
                rightComponent={
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Text>Back</Text>
                    </Button>
                }
            />
            <Grid style={{ flex: 1 }}>
                <Row>
                    <Col>
                        <Text>{JSON.stringify(data)}</Text>
                    </Col>
                </Row>
            </Grid>
        </>
    )
}
