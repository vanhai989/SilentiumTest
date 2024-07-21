import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import CommentItem from './comment'
import { Story } from '../../../types/story'

const CommentList = ({ comments, isReply }: { comments: Story[], isReply: boolean }) => {

    const renderItem = useCallback(({ item }: { item: Story }) => {
        return <CommentItem comment={item} isReply={isReply} key={item.id} />
    }, [])

    return (
        <FlatList
            scrollEnabled={false}
            data={comments}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
        />
    )
}

export default CommentList

const styles = StyleSheet.create({})