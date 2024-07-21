import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { RootNavigationParamsList } from '../../navigator';
import { NavigationStateType } from '../../types/story';
import { layoutDimension } from '../../utils/common';
import { Colors, TabViewKeys } from '../../utils/constants';
import BestStories from './screens/bestStories';
import NewStories from './screens/newStories';
import TopStories from './screens/topStories';


export type NavProps = NavigationProp<RootNavigationParamsList, 'Stories'>

const initNavigationState: NavigationStateType[] = [
    { key: TabViewKeys.top_stories.key, title: TabViewKeys.top_stories.title },
    { key: TabViewKeys.best_stories.key, title: TabViewKeys.best_stories.title },
    { key: TabViewKeys.new_stories.key, title: TabViewKeys.new_stories.title },
]

export const ThemeContext = createContext(null);

const StoriesScreen = () => {
    const navigation = useNavigation<NavProps>();
    const [index, setIndex] = useState(0);
    const [routes] = useState(initNavigationState);

    useEffect(() => {
        console.log('index', index);
    }, [index])

    const renderScene = useMemo(() => {
        return SceneMap({
            [TabViewKeys.top_stories.key]: () => <TopStories navigation={navigation} />,
            [TabViewKeys.best_stories.key]: () => <BestStories navigation={navigation} />,
            [TabViewKeys.new_stories.key]: () => <NewStories navigation={navigation} />,
        });
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.tabViewWrapper}>
                <TabView
                    lazy={true}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layoutDimension.width }}
                    style={{flex: 1}}
                />
            </View>
        </View>
    )
}

export default StoriesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainColor
    },
    tabViewWrapper: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff'
    }
})