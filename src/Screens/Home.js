import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Grid, Row } from 'react-native-easy-grid'
import { Button, Icon } from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { setProduct } from '../Redux/Actions/Product'
import Header from '../Components/Base/Header'
import ProductItem from '../Components/Product/ProductItem'
import Http from '../Utils/Http'

export default ({ navigation }) => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.data)
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            Http.get('/api/category')
                .then(({ data: { data } }) => data),
            Http.get('/api/product')
                .then(({ data: { data } }) => data.rows)
        ]).then(([category, products]) => {
            setLoading(false)
            setCategory(category)
            dispatch(setProduct(products.map(data => ({
                ...data,
                qty: 1,
                totalPrice: data.price
            }))))
        })
    }, [])

    return (
        <>
            <ParallaxScrollView
                backgroundColor="#f27e7c"
                parallaxHeaderHeight={400}
                backgroundScrollSpeed={2}
                stickyHeaderHeight={80}
                renderStickyHeader={() => (
                    <Header
                        title="Home"
                        rightComponent={(
                            <Button transparent onPress={() => navigation.navigate('Search', { category })}>
                                <Icon type="FontAwesome" name="search" />
                            </Button>
                        )}
                    />
                )}
                renderForeground={() => (
                    <Header
                        homeBanner
                        title="Home"
                        loading={loading}
                        category={category}
                        onSearchbarFocus={() => navigation.navigate('Search', { category })}
                    />
                )}
            >
                <Grid style={styles.rowWrapper}>
                {products.map(item => (
                    <Row key={item.id} style={styles.row}>
                        <ProductItem
                            key={item.id}
                            data={item}
                            onLoading={loading}
                            onView={data => navigation.navigate('DetailProduct', { product: data })}
                        />
                    </Row>
                ))}
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