import React, { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView } from 'react-native'
import { Text, View, Picker, List, Content } from 'native-base'
import { Grid, Row } from 'react-native-easy-grid'
import { LineChart } from 'react-native-chart-kit'
import Header from '../Components/Base/Header'
import HistoryList from '../Components/History/HistoryList'
import Http from '../Utils/Http'

export default () => {
    const [recent, setRecent] = useState('week')
    const [list, setList] = useState({ totalRows: 0, totalPage: 0, rows: [] })
    const [statistic, setStatistic] = useState({ labels: [0], recent: [{ income: 0 }], last: [{ income: 0 }] })

    const fetchHistory = (mode = recent) => {
        setRecent(mode)
        Promise.all([
            Http.get(`/api/checkout/?recent=${mode}ly`)
                .then(({ data: { data } }) => data),
            Http.get(`/api/checkout/statistic?mode=${mode}`)
                .then(({ data: { data } }) => data)
        ]).then(([list, statistic]) => {
            setStatistic(statistic)
            setList(list)
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
                            <List>
                                {list.rows.map(hist => (
                                    <HistoryList key={hist.id} data={hist} />
                                ))}
                            </List>
                        <Row>
                            
                        </Row>
                    </Grid>
                </SafeAreaView>
            </Content>
        </>
    )
}