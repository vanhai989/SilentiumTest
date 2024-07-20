import { StoriesType, Story } from '../types/story';
import { fetchFromAPI } from  './baseApi';

const storyCache: { [id: number]: Story } = {};

export const getStory = async (id: number): Promise<Story> => {
  if (storyCache[id]) {
    return storyCache[id];
  }

  const story: Story = await fetchFromAPI(`/item/${id}.json`);
  storyCache[id] = story;
  return story;
};

const getStories = async (type: StoriesType, page: number = 1, limit: number = 10): Promise<Story[]> => {
    
    const storyIds: number[] = await fetchFromAPI(`/${type}stories.json`);
  const limitedStoryIds = storyIds.slice((page - 1) * limit, page * limit);

  const stories = await Promise.all(
    limitedStoryIds.map(async (id) => {
      return getStory(id);
    })
  );

  return stories;
};

export {getStories}
