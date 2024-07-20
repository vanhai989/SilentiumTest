import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabViewKeys } from '../../utils/constants';
import LazyLoading from './components/lazyLoading';
import * as api from '../../services/api'
import { NavigationStateType, StoriesData, StoriesType, StoryCategory } from '../../types/story';
import NewStories from './screens/newStories';
import BestStories from './screens/bestStories';
import TopStories from './screens/topStories';
import { RootNavigationParamsList } from '../../navigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
  

export type NavProps = NavigationProp<RootNavigationParamsList, 'Stories'> 


const initNavigationState: NavigationStateType[] = [
    { key: TabViewKeys.new_stories.key, title: TabViewKeys.new_stories.title },
    { key: TabViewKeys.best_stories.key, title: TabViewKeys.best_stories.title },
    { key: TabViewKeys.top_stories.key, title: TabViewKeys.top_stories.title },
]

const initStoriesData: StoriesData = {
    newStories: {
        init: true,
        stories: []
    },
    bestStories: {
        init: true,
        stories: []
    },
    topStories: {
        init: true,
        stories: []
    },
}

const StoriesScreen = () => {
    const navigation = useNavigation<NavProps>();
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState(initNavigationState);
    const [storiesData, setStoriesData] = useState(initStoriesData)

    useEffect(() => {
        console.log('index', index);

        getInitStories(index)

    }, [index])

    const getInitStories = (id: number) => {
        switch (id) {
            case 0:
                if (storiesData.newStories.init) {
                    getStories('new')
                }
                break;
            case 1:
                if (storiesData.bestStories.init) {
                    getStories('best')
                }
                break;
            case 2:
                if (storiesData.topStories.init) {
                    getStories('top')
                }
                break;
            default:
                return;
        }
    }

    const getStories = async (type: StoriesType, page: number = 1, limit: number = 30) => {
        const res = await api.getStories(type, page, limit)
        switch (type) {
            case 'new':
                // console.log('res', res[0].title);
                
                setStoriesData(pre => {
                    return {
                        ...pre,
                        newStories: {
                            init: false,
                            stories: [...pre.newStories.stories || [], ...res]
                        } 
                    }
                })
                break;
            case 'best':
                setStoriesData(pre => {
                    return {
                        ...pre,
                        bestStories: {
                            init: false,
                            stories: [...pre.bestStories.stories, ...res]
                        } 
                    }
                })
                break;
            case 'top':
                setStoriesData(pre => {
                    return {
                        ...pre,
                        topStories: {
                            init: false,
                            stories: [...pre.topStories.stories, ...res]
                        } 
                    }
                })
                break;

            default:
                break;
        }
    }

    const renderScene = useMemo(() => {
        return SceneMap({
            [TabViewKeys.new_stories.key]: () => <NewStories stories={storiesData.newStories} navigation={navigation} getStories={getStories} />,
            [TabViewKeys.best_stories.key]: () => <BestStories stories={storiesData.bestStories} navigation={navigation} getStories={getStories} />,
            [TabViewKeys.top_stories.key]: () => <TopStories stories={storiesData.topStories} navigation={navigation} getStories={getStories} />,
        });
    }, [storiesData.newStories.stories, storiesData.bestStories.stories, storiesData.topStories.stories])

    return (
        <View style={styles.container}>
            <TabView
                lazy={true}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                // renderLazyPlaceholder={(route) => <LazyLoading route={route} />}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    )
}

export default StoriesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#2196f3'
    }
})