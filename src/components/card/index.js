/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import {Image, Text, TouchableOpacity} from 'react-native'
import styles from './style'

const Card = ({data}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{uri: data.image}} style={styles.image} />
      <Text>{data.title}</Text>
    </TouchableOpacity>
  )
}

export default Card
