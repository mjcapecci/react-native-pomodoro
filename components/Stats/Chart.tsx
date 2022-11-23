import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { getWeekdayOrder } from './helpers/statsHelpers'

interface ChartProps {
  dataset: number[]
}

const Chart = ({ dataset }: ChartProps): JSX.Element => {
  return (
    <LineChart
      data={{
        labels: getWeekdayOrder(Math.round(Date.now() / 1000)),
        datasets: [
          {
            data: dataset,
            strokeWidth: 3, // optional
            strokeDashArray: [5, 5], // optional
          },
        ],
      }}
      width={Dimensions.get('window').width} // from react-native
      height={220}
      // yAxisLabel='$'
      // yAxisSuffix='k'
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: '#000',
        backgroundGradientFrom: '#000',
        backgroundGradientTo: '#000',
        decimalPlaces: 1, // optional, defaults to 2dp
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
