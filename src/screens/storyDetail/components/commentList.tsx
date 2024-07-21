import React, { useCallback } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Comment } from '../../../types/story'
import CommentItem from './comment'

const CommentList = ({ comments, isReply }: { comments: Comment[], isReply: boolean }) => {

    const _renderItem = useCallback(({ item }: { item: Comment }) => {
        return <CommentItem comment={item} isReply={isReply} key={item.id} />
    }, [])

    return (
        <FlatList
            scrollEnabled={false}
            data={comments}
            renderItem={_renderItem}
            keyExtractor={(_, index) => index.toString()}
        />
    )
}

export default CommentList

const styles = StyleSheet.create({})