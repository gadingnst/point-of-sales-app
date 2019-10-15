import React from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Grid, Row } from 'react-native-easy-grid'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { logout } from '../Redux/Actions/Auth'
import Header from '../Components/Base/Header'
import ProductItem from '../Components/Product/ProductItem'

export default ({ navigation }) => {
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
        navigation.replace('Login')
    }

    return (
        <>
            <ParallaxScrollView
                backgroundColor="blue"
                parallaxHeaderHeight={300}
                backgroundScrollSpeed={2}
                stickyHeaderHeight={80}
                renderStickyHeader={() => (
                    <Header title="Title" />
                )}
                renderForeground={() => (
                    <Header title="Home" />
                )}
            >
                <Grid style={styles.rowWrapper}>
                    <Row style={styles.row}>
                        <ProductItem />
                    </Row>
                    <Row style={styles.row}>
                        <ProductItem />
                    </Row>
                    <Row style={styles.row}>
                        <ProductItem />
                    </Row>
                    <Row style={styles.row}>
                        <ProductItem />
                    </Row>
                    <Row style={styles.row}>
                        <ProductItem />
                    </Row>
                </Grid>
            </ParallaxScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    rowWrapper: {
        marginTop: -75,
        paddingHorizontal: 15
    },
    row: {
        paddingVertical: 5
    }
})