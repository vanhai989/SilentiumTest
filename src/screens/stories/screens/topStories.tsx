import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavProps } from '..';
import Indicator from '../../../components/indicator';
import * as api from '../../../services/api';
import { StoriesType, Story, StoryCategory } from '../../../types/story';
import { LimitStories } from '../../../utils/constants';
import StoriesList from '../components/storiesList';
import { Routes } from '../../../navigator/routers';

const initTopStories: StoryCategory = {
    init: true,
    page: 1,
    totalPages: 0,
    stories: []
}
const TopStories = ({ navigation }: { navigation: NavProps }) => {
    const [topStories, setTopStories] = useState(initTopStories)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        _getStories('top', 1)
    }, [])


    const _getStories = async (type: StoriesType, page: number = 1, limit: number = LimitStories) => {
        setLoading(true)
        const {stories, totalPages} = await api.getStories(type, page, limit)
        setTopStories(pre => {
            return {
                init: false,
                page: page,
                totalPages: totalPages,
                stories: [...pre.stories, ...stories]
            }
        })
        setLoading(false)
        if (refreshing) {
            setRefreshing(false)
        }
    }

    const _loadMore = () => {
        if(topStories.totalPages) {
            const nextPage = topStories.page + 1
            _getStories('top', nextPage)
        }
    }

    const _onRefresh = () => {
        setRefreshing(true)
        setTopStories({
            init: false,
            page: 1,
            totalPages: 0,
            stories: []
        })
        _getStories('top', 1)
    }

    const _handleOnPress = (item: Story) => {
        navigation.navigate(Routes.storyDetail, { story: item })
    }

    const _renderStoriesList = () => {
        if (topStories.init && topStories.stories.length == 0 && loading) {
            return <Indicator size="large" />
        } else {
            return <StoriesList
                data={topStories.stories}
                loading={loading}
                loadMore={_loadMore}
                onRefresh={_onRefresh}
                refreshing={refreshing}
                handleOnPress={_handleOnPress}
                typeStory='top' />
        }
    }

    return (
        <View style={styles.container}>
            {_renderStoriesList()}
        </View>
    );
};

export default TopStories;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});
