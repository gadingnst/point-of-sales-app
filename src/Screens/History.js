import React, { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native'
import { Text, View, Picker, List, Content, Spinner } from 'native-base'
import { Grid, Row } from 'react-native-easy-grid'
import { LineChart } from 'react-native-chart-kit'
import Gradient from 'react-native-linear-gradient'
import Header from '../Components/Base/Header'
import HistoryList from '../Components/History/HistoryList'
import Http from '../Utils/Http'
import { rupiah } from '../Utils/Helpers'

export default ({ navigation }) => {
    const [recent, setRecent] = useState('week')
    const [list, setList] = useState({ totalRows: 0, totalPage: 0, rows: [] })
    const [statistic, setStatistic] = useState({ labels: [0], recent: [{ income: 0 }], last: [{ income: 0 }] })
    const [recentIncome, setRecentIncome] = useState(0)
    const [lastIncome, setLastIncome] = useState(0)
    const [today, setToday] = useState({ orders: 0, income: 0 })
    const [yesterday, setYesterday] = useState({ income: 0 })
    const [loading, setLoading] = useState(false)

    const calculateImprovePerc = (recent, last) => {
        const percent = Number.parseInt(((recent - last) / last) * 100)
        return Number.isNaN(percent) ? `+0%` : `${percent < 0 ? '' : '+'}${percent}%` 
    }

    const fetchHistory = (mode = recent) => {
        setLoading(true)
        setRecent(mode)
        Promise.all([
            Http.get('/api/checkout/daily')
                .then(({ data: { data }}) => data),
            Http.get(`/api/checkout/?recent=${mode}ly`)
                .then(({ data: { data } }) => data),
            Http.get(`/api/checkout/statistic?mode=${mode}`)
                .then(({ data: { data } }) => data)
        ]).then(([daily, list, statistic]) => {
            setToday({ orders: daily.data.length, income: daily.recentIncome })
            setYesterday({ income: daily.recentIncome })
            setStatistic(statistic)
            setList(list)
            setLastIncome(statistic.last.reduce((acc, cur) => acc + cur.income, 0))
            setRecentIncome(statistic.recent.reduce((acc, cur) => acc + cur.income, 0))
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchHistory()
    }, [])

    return (
        <>
            <Header title="History" />
            <Content>
                <SafeAreaView>
                    <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                        <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 22, alignSelf: 'center' }}>Revenue</Text>
                        <Picker
                            note
                            mode="dropdown"
                            style={{ flex: 1 }}
                            selectedValue={recent}
                            onValueChange={value => fetchHistory(value)}
                        >
                            <Picker.Item label="Weekly" value="week" />
                            <Picker.Item label="Yearly" value="year" />
                        </Picker>
                    </View>
                    <Grid style={{ padding: 10 }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 6 }}>
                            <Gradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4AD5F3', '#797AF4']} style={[styles.card, styles.cardDanger, { flex: 1 } ]}>
                                <Text style={styles.cardTitle}>TODAY'S ORDERS</Text>
                                {
                                    loading
                                        ? <Spinner color="#fff" />
                                        : <Text style={{ fontWeight: 'bold' }}>{today.orders} orders</Text>
                                }
                            </Gradient>
                            <Gradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FC4A85', '#FC7B65']} style={[styles.card, styles.cardDanger, { flex: 1 } ]}>
                                <Text style={styles.cardTitle}>TODAY'S INCOME</Text>
                                {
                                    loading
                                        ? <Spinner color="#fff" />
                                        : <Text style={{ fontWeight: 'bold' }}>{rupiah(today.income)} ({calculateImprovePerc(today.income, yesterday.income)} from yesterday)</Text>
                                }
                            </Gradient>
                        </View>
                        <View style={{ marginHorizontal: 6, marginVertical: 15 }}>
                            <Gradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4AE5AA', '#4ADFD8']} style={[styles.card, styles.cardDanger]}>
                                <Text style={styles.cardTitle}>THIS {recent.toUpperCase()}'S INCOME</Text>
                                {
                                    loading
                                        ? <Spinner color="#fff" />
                                        : <Text style={{ fontWeight: 'bold' }}>{rupiah(recentIncome)} ({calculateImprovePerc(recentIncome, lastIncome)} from last {recent})</Text>
                                }
                            </Gradient>
                        </View>
                        <Row>
                            <LineChart
                                bezier
                                height={220}
                                yAxisLabel="Rp. "
                                width={Dimensions.get('window').width - 30}
                                style={{ margin: 5, borderRadius: 10 }}
                                verticalLabelRotation={25}
                                data={{
                                    labels: statistic.labels,
                                    datasets: [
                                        { data: statistic.recent.map(data => Number(data.income)),  },
                                        { data: statistic.last.map(data => Number(data.income)) }
                                    ]
                                }}
                                chartConfig={{
                                    backgroundColor: "#b07df0",
                                    backgroundGradientFrom: "#f27e7c",
                                    backgroundGradientTo: "#b07df0",
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                }}
                            />
                        </Row>
                        <Text style={{ fontWeight: 'bold', marginVertical: 15 }}>Last {recent} orders</Text>
                        <List>
                            {list.rows.map(hist => (
                                <HistoryList
                                    key={hist.id}
                                    data={hist}
                                    onView={data => navigation.navigate('DetailOrder', { data })}
                                />
                            ))}
                        </List>
                    </Grid>
                </SafeAreaView>
            </Content>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 4,
        elevation: 8
    },
    cardTitle: {
        fontFamily: 'Montserrat-Regular',
        color: '#fff'
    },
    cardDanger: {
        backgroundColor: '#f5365c'
    }
})