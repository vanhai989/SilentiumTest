import React, { memo, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavProps } from '..';
import { StoriesType, Story, StoryCategory } from '../../../types/story';
import StoriesList from '../components/storiesList';
import * as api from '../../../services/api'

const initNewStories: StoryCategory = {
    init: true,
    page: 1,
    stories: []
}
let limit = 30

const NewStories = ({ navigation }: { navigation: NavProps }) => {
    const [newStories, setNewStories] = useState(initNewStories)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getStories('top', 1, 30)

    }, [])
    

    const getStories = async (type: StoriesType, page: number = 1, limit: number = 30) => {
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
        if(refreshing) {
            setRefreshing(false)
        }
    }

    const loadMore = () => {
        const newPage = newStories.page + 1
        console.log('newPage top', newPage);
        getStories('top', newPage, limit)
    }

    const onRefresh = () => {
        setRefreshing(true)
        setNewStories({
            init: false,
            page: 1,
            stories: []
        })
        getStories('new', 1, limit)
    }

    const handleOnPress = (item: Story) => {
        navigation.navigate('StoryDetail', {story: item})
    }

    const renderStoriesList = () => {
        if(newStories.init && newStories.stories.length == 0 && loading) {
            return <ActivityIndicator size='large' color='#2196f3' /> 
        } else {
            return <StoriesList 
                        data={newStories.stories} 
                        loading={loading} 
                        loadMore={loadMore} 
                        onRefresh={onRefresh} 
                        refreshing={refreshing}
                        handleOnPress={handleOnPress}
                        typeStory='top' />
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
