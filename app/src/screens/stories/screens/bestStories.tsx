import React, { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavProps } from '..';
import { StoryCategory } from '../../../types/story';
import StoriesList from '../components/storiesList';

const BestStories = ({ navigation, stories }: { navigation: NavProps, stories: StoryCategory }) => {
    const renderStoriesList = useCallback(() => {
        return <StoriesList navigation={navigation} data={stories} />
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#ff4081' }}>
            {renderStoriesList()}
        </View>
    );
};

export default memo(BestStories);

const styles = StyleSheet.create({});
