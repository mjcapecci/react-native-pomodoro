import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { getWeekdayOrder } from './helpers/statsHelpers'

const Chart = (): JSX.Element => {
  return (
    <LineChart
      data={{
        labels: getWeekdayOrder(Math.round(Date.now() / 1000)),
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
          },
        ],
      }}
      width={Dimensions.get('window').width} // from react-native
      height={220}
      yAxisLabel='$'
      yAxisSuffix='k'
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: '#000',
        backgroundGradientFrom: '#000',
        backgroundGradientTo: '#000',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#fff',
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 0,
      }}
    ></LineChart>
  )
}

export default Chart
