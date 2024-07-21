import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const FooterComponent = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='small' color='#2196f3' />
        </View>
    )
}

export default FooterComponent

const styles = StyleSheet.create({
    container: {
        height: 50, paddingBottom: 25
    }
})