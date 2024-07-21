import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import RenderHTML from 'react-native-render-html'

const ContentHtml = ({ content }: { content: string | undefined }) => {

    if (!content) {
        return null
    }
    return <RenderHTML
        contentWidth={200}
        source={{
            html: `${content}`
        }}
    />
}

export default memo(ContentHtml)

const styles = StyleSheet.create({})