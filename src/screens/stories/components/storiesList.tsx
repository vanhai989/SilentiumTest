import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StoriesType, Story } from '../../../types/story';
import FooterComponent from './footerComponent';
import StoryItem from './storyItem';

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
    const _handleLoadMore = () => {
        loadMore()
    }

    const _renderItem = useCallback(({item}: {item: Story}) => <StoryItem item={item} handleOnPress={handleOnPress} />, [])

    if (data.length == 0) {
        return null
    }

  
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={_renderItem}
                keyExtractor={(_, index) => index + typeStory}
                onEndReached={_handleLoadMore}
                onRefresh={onRefresh}
                refreshing={refreshing}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={15}
                removeClippedSubviews={true}
                onEndReachedThreshold={0.5}
                ListFooterComponent={<FooterComponent loading={loading} /> }
            />
        </View>
    )
}

export default StoriesList

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})