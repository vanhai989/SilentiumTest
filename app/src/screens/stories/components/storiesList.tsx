import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { FlashList } from "@shopify/flash-list";
import { StoriesType, Story, StoryCategory } from '../../../types/story'
import { NavProps } from '..';
import { Routes } from '../../../navigator/routers';
import RenderHTML from 'react-native-render-html';
import StoryItem from './storyItem';
import FooterComponent from './footerComponent';

const itemHeight = 200
type props = {
    typeStory: StoriesType,
    data: Story[],
    loadMore: () => void,
    onRefresh: () => void,
    loading: boolean,
    refreshing: boolean,
    handleOnPress: (story: Story) => void,
}
const StoriesList = ({ typeStory, data, loading, loadMore, onRefresh, refreshing, handleOnPress }: props) => {
    const handleLoadMore = () => {
        loadMore()
    }

    const renderItem = useCallback(({item}: {item: Story}) => <StoryItem item={item} handleOnPress={handleOnPress} />, [])

    if (data.length == 0) {
        return null
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(_, index) => index + typeStory}
                onEndReached={handleLoadMore}
                onRefresh={onRefresh}
                refreshing={refreshing}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <FooterComponent /> : null}
            />
        </View>
    )
}

export default StoriesList

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
})