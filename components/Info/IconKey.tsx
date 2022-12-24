import React from 'react'
import { Text, View } from 'react-native'
import { Headline } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'

import { styles } from './Info.style'
import { ColorType } from '../../types'

export interface IconKeyData {
  icon: 'hammer' | 'walk' | 'pizza' | 'timer-outline' | 'stats-chart' | 'information-circle'
  description: string
  color?: ColorType
}

interface IconKeyProps {
  tableTitle: string
  tableData: IconKeyData[]
}

const IconKey = ({ tableTitle, tableData }: IconKeyProps): JSX.Element => {
  return (
    <View style={styles.roundIconContainer}>
      <Headline style={styles.headline}>{tableTitle}:</Headline>
      {tableData.map((item, index) => (
        <View style={styles.descriptorContainer} key={index}>
          <Ionicons name={item.icon} color={item.color ?? ColorType.Grey} size={24} />
          <Text style={styles.text}>{item.description}</Text>
        </View>
      ))}
    </View>
  )
}

export default IconKey
