import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Colors } from '../utils/constants'

const Indicator = ({size}: {size: 'small' | 'large'}) => {
  return <ActivityIndicator size={size} color={Colors.mainColor} />
}

export default Indicator

const styles = StyleSheet.create({})