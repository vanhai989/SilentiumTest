import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Indicator from '../../../components/indicator';
import { getStory } from '../../../services/api';
import { Story } from '../../../types/story';
import ContentHtml from '../../stories/components/contentHtml';
import CommentList from './commentList';

const CommentItem = ({ comment, isReply }: {comment: Story, isReply: boolean}) => {
    const [replies, setReplies] = useState<Story[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      fetchReplies();
    }, []);
  
    const fetchReplies = async () => {
      if (comment.kids) {
        const fetchedReplies = await Promise.all(
          comment.kids.map((replyId) => getStory(replyId))
        );
        setReplies(fetchedReplies);
      }
      setLoading(false);
    };

    if(!comment) {
        return null
    }
  
    if (loading && isReply) {
      return <Indicator size='small' />
    }
  
    return (
      <View style={styles.commentContainer}>
        <Text style={styles.commentAuthor}>{comment.by}</Text>
        <ContentHtml content={comment.text} />
        {replies.length > 0 && (
          <View style={styles.repliesContainer}>
            <CommentList comments={replies} isReply={true} />
          </View>
        )}
      </View>
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

  export default CommentItem;