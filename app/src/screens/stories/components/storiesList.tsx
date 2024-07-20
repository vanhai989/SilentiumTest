import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Story, StoryCategory } from '../../../types/story'
import { NavProps } from '..';
import { Routes } from '../../../navigator/routers';

let page = 1
let limit = 30
const StoriesList= ({navigation, data, getStories}: {navigation: NavProps, data: StoryCategory, getStories: any}) => {
    const handleLoadMore = () => {
        page += 1
        getStories('new', page, limit)
    }

    const renderItem = ({item, index}: {item: Story, index: number}) => {

        const handleOnPress = () => {
            navigation.navigate(Routes.storyDetail, {storyId: item.id})
        }
       
        return (
            <TouchableOpacity onPress={handleOnPress} style={styles.itemContainer} key={index}>
                <Text>title: {item.title}</Text>
                <Text>text: {item.text}</Text>
            </TouchableOpacity>
        )
    }
  return (
    <FlatList
        data={data.stories}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
    />
  )
}

export default StoriesList

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        padding: 10,
    }
})