import React, { useState } from 'react'
import { Item, Icon, Input, View, Picker, Content } from 'native-base'
import Header from '../Components/Base/Header'
import Http from '../Utils/Http'

export default props => {
    const categories = props.navigation.getParam('category') || []
    const [productState, setProduct] = useState({ totalRows: 0, rows: [] }) 
    const [categoryState, setCategory] = useState('')
    const [searchState, setSearch] = useState('')
    const [sortState, setSort] = useState('updatedat')
    const [orderState, setOrder] = useState('desc')
    const [pageState, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const fetchProduct = (opts = {}) => {
        setLoading(true)
        const {
            search = searchState,
            category = categoryState,
            sort = sortState,
            order = orderState,
            page = 1
        } = opts

        setSearch(search)
        setCategory(category)
        setSort(sort)
        setOrder(order)
        setPage(page)

        return new Promise((resolve, reject) => {
            Http.get(`/api/product?limit=12&page=${page}&sort=${sort}-${order}&search=${search}${category ? `&category=${category}` : ''}`)
                .then(({ data: { data } }) => {
                    setProduct(data.rows.map(item => ({
                        ...item,
                        qty: 1,
                        totalPrice: item.price
                    })))
                    resolve(data)
                })
                .catch(({ response }) => {
                    reject(response)
                })
                .finally(() => setLoading(false))
        })
    }

    return (
        <>
            <Header title="Search" />
            <View>
                <Item>
                    <Input placeholder='Search Product..'/>
                    <Icon active name='search' />
                </Item>
                <Item picker>
                    <Picker>
                        <Picker.Item label="All Category" value="all" />
                        {categories.map(item => (
                            <Picker.Item key={item.id} label={item.name} value={item.id} />
                        ))}
                    </Picker>
                </Item>
            </View>
            <Content>
                
            </Content>
        </>
    )
}