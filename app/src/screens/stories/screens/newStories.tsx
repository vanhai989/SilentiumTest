import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavProps } from '..';
import Indicator from '../../../components/indicator';
import * as api from '../../../services/api';
import { StoriesType, Story, StoryCategory } from '../../../types/story';
import { LimitStories } from '../../../utils/constants';
import StoriesList from '../components/storiesList';

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
        getStories('new', 1, LimitStories)
    }, [])
    

    const getStories = async (type: StoriesType, page: number = 1, limit: number = LimitStories) => {
        setLoading(true)
        const stories = await api.getStories(type, page, limit)
        setNewStories(pre => {
            return {
                init: false,
                page: page,
                stories: [...pre.stories, ...stories]
            }
        })
        setLoading(false)
        setRefreshing(false)
    }

    const loadMore = () => {
        const newPage = newStories.page + 1
        getStories('new', newPage)
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
        navigation.navigate('StoryDetail', {story: item})
    }

    const renderStoriesList = () => {
        const isShowIndicator = (newStories.init && newStories.stories.length == 0 && loading) || refreshing
        if(isShowIndicator) {
            return <Indicator size='large' />
        } else {
            return <StoriesList 
                        data={newStories.stories} 
                        loading={loading} 
                        loadMore={loadMore} 
                        onRefresh={onRefresh} 
                        refreshing={refreshing}
                        handleOnPress={handleOnPress}
                        typeStory='new' />
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
