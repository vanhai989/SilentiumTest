import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routers';
import StoriesScreen from '../screens/stories';
import StoryScreen from '../screens/storyDetail';
import StoryDetailScreen from '../screens/storyDetail';
import { Story } from '../types/story';

export type RootNavigationParamsList = {
  [Routes.stories]: undefined; 
  [Routes.storyDetail]: { story: Story };
};

const Stack = createNativeStackNavigator<RootNavigationParamsList>();

function AppRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={Routes.stories} component={StoriesScreen} />
        <Stack.Screen name={Routes.storyDetail} component={StoryDetailScreen} 
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#2196f3',
          },
          headerTintColor: '#f1f9ff',
          headerTitle: 'Story Detail',
          headerBackTitle: ''
            }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoute;