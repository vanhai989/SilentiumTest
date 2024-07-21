import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavProps } from '..';
import Indicator from '../../../components/indicator';
import * as api from '../../../services/api';
import { StoriesType, Story, StoryCategory } from '../../../types/story';
import StoriesList from '../components/storiesList';
import { LimitStories } from '../../../utils/constants';

const initNewStories: StoryCategory = {
    init: true,
    page: 1,
    stories: []
}

const NewStories = ({ navigation }: { navigation: NavProps }) => {
    const [newStories, setNewStories] = useState(initNewStories)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getStories('best', 1, LimitStories)
    }, [])

    const getStories = async (type: StoriesType, page: number = 1, limit: number = LimitStories) => {
        setLoading(true)
        const res = await api.getStories(type, page, limit)
        setNewStories(pre => {
            return {
                init: false,
                page: page,
                stories: [...pre.stories, ...res]
            }
        })
        setLoading(false)
        if (refreshing) {
            setRefreshing(false)
        }
    }

    const loadMore = () => {
        const newPage = newStories.page + 1
        getStories('best', newPage)
    }

    const onRefresh = () => {
        setRefreshing(true)
        setNewStories({
            init: false,
            page: 1,
            stories: []
        })
        getStories('new', 1)
    }

    const handleOnPress = (item: Story) => {
        navigation.navigate('StoryDetail', { story: item })
    }

    const renderStoriesList = () => {
        if (newStories.init && newStories.stories.length == 0 && loading) {
            return <Indicator size='large' />

        } else {
            return <StoriesList
                data={newStories.stories}
                loading={loading}
                loadMore={loadMore}
                onRefresh={onRefresh}
                refreshing={refreshing}
                handleOnPress={handleOnPress}
                typeStory='best' />
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
            {renderStoriesList()}
        </View>
    );
};

export default memo(NewStories);

const styles = StyleSheet.create({});
