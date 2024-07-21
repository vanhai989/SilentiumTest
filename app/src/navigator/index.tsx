import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import StoriesScreen from '../screens/stories';
import StoryDetailScreen from '../screens/storyDetail';
import { Story } from '../types/story';
import { Colors, DetailTitle } from '../utils/constants';
import { Routes } from './routers';

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
              backgroundColor: Colors.mainColor,
          },
          headerTintColor: Colors.headerColor,
          headerTitle: DetailTitle,
          headerBackTitleVisible: false,
            }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoute;