import React from 'react'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { Text, Button } from 'native-base'
import Header from '../Components/Base/Header'

export default ({ navigation }) => {
    return (
        <>
            <Header
                title="Manage User"
                rightComponent={(
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Text>Back</Text>
                    </Button>
                )}
            />
            <Grid style={{ padding: 50 }}>
                <Row>
                    <Col>
                        <Text>Hello from Form Category</Text>
                    </Col>
                </Row>
            </Grid>
        </>
    )
}