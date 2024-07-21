import React, { useCallback } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Story } from '../../../types/story'
import CommentItem from './comment'

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