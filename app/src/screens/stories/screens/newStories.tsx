import React, { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavProps } from '..';
import { StoryCategory } from '../../../types/story';
import StoriesList from '../components/storiesList';

const NewStories = ({ navigation, stories, getStories }: { navigation: NavProps, stories: StoryCategory, getStories: any }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#ff4081' }}>
             <StoriesList navigation={navigation} data={stories} getStories={getStories} />
        </View>
    );
};

export default memo(NewStories);

const styles = StyleSheet.create({});
