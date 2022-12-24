import React from 'react'
import { Text } from 'react-native'

import { styles } from './Info.style'

interface DescriptionProps {
  description: string
}

const HighLevelDescription = ({ description }: DescriptionProps): JSX.Element => {
  return <Text style={styles.descriptionText}>{description}</Text>
}

export default HighLevelDescription
