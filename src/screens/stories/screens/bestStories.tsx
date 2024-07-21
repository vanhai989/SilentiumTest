import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavProps } from '..';
import Indicator from '../../../components/indicator';
import { Routes } from '../../../navigator/routers';
import * as api from '../../../services/apis';
import { StoriesType, Story, StoryCategory } from '../../../types/story';
import { LimitStories } from '../../../utils/constants';
import StoriesList from '../components/storiesList';

const initBestStories: StoryCategory = {
    init: true,
    page: 1,
    totalPages: 0,
    stories: []
}

const BestStories = ({ navigation }: { navigation: NavProps }) => {
    const [bestStories, setBestStories] = useState(initBestStories)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        _getStories('best', 1)
    }, [])

    const _getStories = async (type: StoriesType, page: number = 1, limit: number = LimitStories) => {
        setLoading(true)
        const { stories, totalPages } = await api.getStories(type, page, limit)
        setBestStories(pre => {
            return {
                init: false,
                page: page,
                totalPages: totalPages,
                stories: [...pre.stories, ...stories]
            }
        })
        setLoading(false)
        setRefreshing(false)
    }

    const _loadMore = () => {
        if (bestStories.totalPages) {
            const nextPage = bestStories.page + 1
            _getStories('best', nextPage)
        }
    }

    const _onRefresh = () => {
        setRefreshing(true)
        setBestStories({
            init: false,
            page: 1,
            totalPages: 0,
            stories: []
        })
        _getStories('best', 1)
    }

    const _handleOnPress = (item: Story) => {
        navigation.navigate(Routes.storyDetail, { story: item })
    }

    const _renderStoriesList = () => {
        const isShowIndicator = (bestStories.init && bestStories.stories.length == 0 && loading) || refreshing
        if (isShowIndicator) {
            return <Indicator size='large' />

        } else {
            return <StoriesList
                data={bestStories.stories}
                loading={loading}
                loadMore={_loadMore}
                onRefresh={_onRefresh}
                refreshing={refreshing}
                handleOnPress={_handleOnPress}
                typeStory='best' />
        }
    }

    return (
        <View style={styles.container}>
            {_renderStoriesList()}
        </View>
    );
};

export default BestStories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
