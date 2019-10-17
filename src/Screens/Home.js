import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Grid, Row } from 'react-native-easy-grid'
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
        console.log(Http.defaults.baseURL)
        Promise.all([
            Http.get('/api/category')
                .then(({ data: { data } }) => data),
            Http.get('/api/product')
                .then(({ data: { data } }) => data.rows)
        ]).then(([category, products]) => {
            setLoading(false)
            setCategory(category)
            dispatch(setProduct(products))
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
                    <Header title="Home" />
                )}
                renderForeground={() => (
                    <Header homeBanner loading={loading} category={category} title="Home" />
                )}
            >
                <Grid style={styles.rowWrapper}>
                {products.map(item => (
                    <Row key={item.id} style={styles.row}>
                        <ProductItem data={item} />
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