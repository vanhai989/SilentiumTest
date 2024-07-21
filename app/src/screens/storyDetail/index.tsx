// src/components/StoryDetailScreen.tsx

import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootNavigationParamsList } from '../../navigator';
import { getStory } from '../../services/api';
import { Story } from '../../types/story';
import ContentHtml from '../stories/components/contentHtml';
import CommentList from './components/commentList';
import { formatTimeLocale } from '../../utils/common';

type RouteProps = RouteProp<RootNavigationParamsList, 'StoryDetail'>;

const StoryDetailScreen = () => {
  const route = useRoute<RouteProps>();
  const { story } = route.params;
  const [comments, setComments] = useState<Story[]>([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    if (story.kids) {
      const fetchedComments = await Promise.all(
        story.kids.map((commentId) => getStory(commentId))
      );
      setComments(fetchedComments);
    }
  };

  const _renderComment = () => {
    let commentContent = <View />
    if (comments.length > 0) {
      commentContent = (
        <View>
          <CommentList comments={comments} isReply={false} />
        </View>
      )

    } else if (story?.kids?.length || 0 > 0) {
      commentContent = <ActivityIndicator size="small" color="#4267B2" />
    }
    return (
      <View>
        <Text style={styles.commentTitle}>Comments:</Text>
        {commentContent}
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.detail}>By: {story.by}</Text>
        <Text style={styles.detail}>Score: {story.score}</Text>
        <Text style={styles.detail}>Time: {formatTimeLocale(story.time)}</Text>
        <ContentHtml content={story.text} />
        {_renderComment()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  detail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  content: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  commentContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f2f5',
    borderRadius: 5,
    marginLeft: 10,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
  },
  repliesContainer: {
    marginTop: 10,
  },
});

export default StoryDetailScreen;
