import React from 'react'
import { StyleSheet, View } from 'react-native'
import Indicator from '../../../components/indicator'

const FooterComponent = () => {
    return (
        <View style={styles.container}>
            <Indicator size="small" />
        </View>
    )
}

export default FooterComponent

const styles = StyleSheet.create({
    container: {
        height: 50, paddingBottom: 25
    }
})