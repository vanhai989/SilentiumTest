
const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';
const DetailTitle = 'Story Detail'
const LimitStories = 20


const TabViewKeys = {
    new_stories: {
        key: 'NEW_STORIES',
        title: 'New stories'
    },
    best_stories: {
        key: 'BEST_STORIES',
        title: 'Best stories'
    },
    top_stories: {
        key: 'TOP_STORIES',
        title: 'Top stories'
    },
}

const Colors = {
    mainColor: '#2196f3',
    headerColor: '#f1f9ff'

}

export {BASE_URL, TabViewKeys, Colors, DetailTitle, LimitStories}