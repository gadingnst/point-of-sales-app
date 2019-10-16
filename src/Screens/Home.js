import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Grid, Row } from 'react-native-easy-grid'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { logout } from '../Redux/Actions/Auth'
import Header from '../Components/Base/Header'
import ProductItem from '../Components/Product/ProductItem'
import Http from '../Utils/Http'

export default ({ navigation }) => {
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
        navigation.replace('Login')
    }

    useEffect(() => {
        // todo
        Http.get('/api/product')
        return () => {
            
        }
    }, [])


    return (
        <>
            <ParallaxScrollView
                backgroundColor="#f27e7c"
                parallaxHeaderHeight={400}
                backgroundScrollSpeed={2}
                stickyHeaderHeight={80}
                renderStickyHeader={() => (
                    <Header title="Home" />
                )}
                renderForeground={() => (
                    <Header banner title="Home" />
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