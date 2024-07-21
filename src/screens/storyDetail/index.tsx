import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Indicator from '../../components/indicator';
import { RootNavigationParamsList } from '../../navigator';
import { getComments } from '../../services/apis';
import fetchWrapper from '../../services/baseApi';
import { Comment } from '../../types/story';
import { formatTimeLocale } from '../../utils/common';
import ContentHtml from '../stories/components/contentHtml';
import CommentList from './components/commentList';

type RouteProps = RouteProp<RootNavigationParamsList, 'StoryDetail'>;

const StoryDetailScreen = () => {
  const route = useRoute<RouteProps>();
  const { story } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const _fetchStoryDetails = async () => {
        try {
          _fetchComments();
        } catch (error: any) {
          if (error.name !== 'AbortError') {
            console.error('AbortError');
          }
        }
      };

      _fetchStoryDetails();

      return () => {
        fetchWrapper.abort();
      };
    }, [story.id])
  );

  const _fetchComments = async () => {
    if (story.kids) {
      const fetchedComments = await Promise.all(
        story.kids.map((commentId) => getComments(commentId))
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
      commentContent = <Indicator size="small" />
    }
    return (
      <View style={styles.wrapperComments}>
        <Text style={styles.commentTitle}>Comments:</Text>
        {commentContent}
      </View>
    )
  }

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.detail}>By: {story.by}</Text>
        <Text style={styles.detail}>Score: {story.score}</Text>
        <View style={styles.wrapperText}>
          <Text style={styles.detail}>Date created: {formatTimeLocale(story.time)}</Text>
        </View>
        <ContentHtml content={story.text} />
        {_renderComment()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 10,
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
  wrapperText: {
    paddingBottom: 10
  },
  wrapperComments: {
    paddingBottom: 50
  }
});

export default StoryDetailScreen;
