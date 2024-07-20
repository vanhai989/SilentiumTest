import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LazyLoading = ({route}) => {
    console.log('route', route);
    
  return (
    <View style={styles.scene}>
    <Text>Loading title {route.title}…</Text>
  </View>
  )
}

export default LazyLoading

const styles = StyleSheet.create({
    scene: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });