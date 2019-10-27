import React, { useState } from 'react'
import { NavigationEvents } from 'react-navigation'
import { Toast, Item, Icon, Input, View, Picker, Content, Button, Text, Spinner } from 'native-base'
import Header from '../Components/Base/Header'
import ProductItem from '../Components/Product/ProductItem'
import Http from '../Utils/Http'

export default props => {
    const categories = props.navigation.getParam('category') || []
    const [productState, setProduct] = useState({ totalRows: 0, rows: [] }) 
    const [categoryState, setCategory] = useState(null)
    const [searchState, setSearch] = useState('')
    const [pageState, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const fetchProduct = (opts = {}) => {
        setLoading(true)
        setProduct({ totalRows: 0, rows: [{}, {}, {}, {}] })
        const {
            search = searchState,
            category = categoryState,
            page = 1
        } = opts

        setSearch(search)
        setCategory(category)
        setPage(page)

        return new Promise((resolve, reject) => {
            Http.get(
                `/api/product?limit=12&page=${page}&search=${search}${
                    category ? `&category=${category}` : ''
                }`
            )
                .then(({ data: { data } }) => {
                    setProduct({
                        totalRows: data.totalRows,
                        rows: data.rows.map(item => ({
                            ...item,
                            qty: 1,
                            totalPrice: item.price
                        }))
                    })
                    resolve(data)
                })
                .catch(err => {
                    Toast.show({
                        text:
                            err.message === 'Network Error'
                                ? "Network Error: Your connection can't be established."
                                : `${err.response.data.message}`,
                        type: 'danger',
                        position: 'top'
                    })
                    reject(err)
                })
                .finally(() => setLoading(false))
        })
    }

    return (
        <>
            <Header
                title="Search"
                rightComponent={
                    <Button
                        transparent
                        onPress={() => props.navigation.goBack()}>
                        <Text>Back</Text>
                    </Button>
                }
            />
            <View>
                <Item>
                    <Input
                        onSubmitEditing={() => fetchProduct()}
                        onChangeText={value => setSearch(value)}
                        placeholder="Search Product.."
                    />
                    <Icon active name="search" />
                </Item>
                <Item picker>
                    <Picker
                        selectedValue={categoryState}
                        onValueChange={value =>
                            value === 'all'
                                ? setCategory(null)
                                : setCategory(value)
                        }>
                        <Picker.Item label="All Category" value="all" />
                        {categories.map(item => (
                            <Picker.Item
                                key={item.id}
                                label={item.name}
                                value={item.id}
                            />
                        ))}
                    </Picker>
                </Item>
                <Button
                    block
                    primary
                    disabled={loading}
                    onPress={() => fetchProduct()}>
                    {!loading || <Spinner color="#fff" />}
                    <Text>Search</Text>
                </Button>
            </View>
            <Content padder>
                {productState.rows.map((item, i) => (
                    <ProductItem
                        key={i}
                        data={item}
                        onLoading={loading}
                        onView={data =>
                            props.navigation.navigate('DetailProduct', {
                                product: data
                            })
                        }
                    />
                ))}
            </Content>
            <NavigationEvents
                onWillFocus={({ state }) =>
                    state.params.current
                        ? fetchProduct({ category: state.params.current })
                        : false
                }
            />
        </>
    )
}
