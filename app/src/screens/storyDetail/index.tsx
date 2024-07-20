// src/components/StoryDetailScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Story } from '../../types/story';
import { getStory } from '../../services/api';
import { RootNavigationParamsList } from '../../navigator';


type NavProps = NavigationProp<RootNavigationParamsList, 'storyDetail'> 
type RouteProps = RouteProp<RootNavigationParamsList, 'storyDetail'>;

const StoryDetailScreen = () => {
  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();
  const { storyId } = route.params;
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = async () => {
    const storyData = await getStory(storyId);
    setStory(storyData);
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {story && (
        <>
          <Text style={styles.title}>{story.title}</Text>
          <Text style={styles.text}>{story.text}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default StoryDetailScreen;
