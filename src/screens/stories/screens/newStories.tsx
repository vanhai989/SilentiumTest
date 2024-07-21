import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavProps } from '..';
import Indicator from '../../../components/indicator';
import { Routes } from '../../../navigator/routers';
import * as api from '../../../services/api';
import { StoriesType, Story, StoryCategory } from '../../../types/story';
import { LimitStories } from '../../../utils/constants';
import StoriesList from '../components/storiesList';

const initNewStories: StoryCategory = {
    init: true,
    page: 1,
    totalPages: 0,
    stories: []
}
const NewStories = ({ navigation }: { navigation: NavProps }) => {
    const [newStories, setNewStories] = useState(initNewStories)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        _getStories('new', 1)
    }, [])
    
    const _getStories = async (type: StoriesType, page: number = 1, limit: number = LimitStories) => {
        setLoading(true)
        const {stories, totalPages} = await api.getStories(type, page, limit)
        setNewStories(pre => {
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
        if(newStories.page < newStories.totalPages) {
            const nextPage = newStories.page + 1
            _getStories('new', nextPage)
        }
    }

    const _onRefresh = () => {
        setRefreshing(true)
        setNewStories({
            init: false,
            page: 1,
            totalPages: 0,
            stories: []
        })
        _getStories('new', 1)
    }

    const _handleOnPress = (item: Story) => {
        navigation.navigate(Routes.storyDetail, {story: item})
    }

    const renderStoriesList = () => {
        const isShowIndicator = (newStories.init && newStories.stories.length == 0 && loading) || refreshing
        if(isShowIndicator) {
            return <Indicator size='large' />
        } else {
            return <StoriesList 
                        data={newStories.stories} 
                        loading={loading} 
                        loadMore={_loadMore} 
                        onRefresh={_onRefresh} 
                        refreshing={refreshing}
                        handleOnPress={_handleOnPress}
                        typeStory='new' />
        }
    }

    return (
        <View style={styles.container}>
            {renderStoriesList()}
        </View>
    );
};

export default NewStories;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});
