import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Story } from '../../../types/story';
import { portTimeFormat } from '../../../utils/common';
import ContentHtml from './contentHtml';

const StoryItem = ({ item, handleOnPress }: { item: Story, handleOnPress: (item: Story) => void }) => {
    const _handleLinking = () => {
        Linking.openURL(item?.url || '')
    }

    const formattedTime = portTimeFormat(item.time)
    return (
        <TouchableOpacity onPress={() => handleOnPress(item)} style={styles.itemContainer} key={item.id.toString()}>
            <View style={styles.storyInfo}>
                <Text style={styles.author}>By: {item.by}</Text>
                <Text style={styles.time}>Posted: {formattedTime}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <ContentHtml content={item.text} />
            {item.url && <TouchableOpacity onPress={_handleLinking}>
                <Text style={styles.url}>refer to {item.url}</Text>
                </TouchableOpacity>}
            <View style={styles.details}>
                <Text style={styles.author}>{item?.kids?.length || 0} Comments</Text>
                <Text style={styles.score}>Score: {item.score}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default StoryItem

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    storyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    author: {
        fontSize: 14,
        color: '#555',
    },
    score: {
        fontSize: 14,
        color: '#555',
        marginLeft: 10
    },
    url: {
        fontSize: 16,
        color: '#1a0dab',
        textDecorationLine: 'underline',
        marginTop: 5,
    },
    time: {
        fontSize: 12,
        color: '#777',
        marginLeft: 20
    },
    webview: {
        height: 500,
        width: '100%',
        marginTop: 10,
    },

})