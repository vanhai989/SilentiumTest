import { StoriesType, Story } from '../types/story';

import { BASE_URL } from "../utils/constants";
import fetchWrapper from "./baseApi";


let storyIdCache: { [type: string]: number[] } = {};

export const getStoryIds = async (type: StoriesType): Promise<number[]> => {
  if (!storyIdCache[type]) {
    storyIdCache[type] = await fetchWrapper.fetch<number[]>(`${BASE_URL}${type}stories.json`);
  }
  return storyIdCache[type];
};

export const getStory = async (id: number): Promise<Story> => {
  const story = await fetchWrapper.fetch<Story>(`${BASE_URL}item/${id}.json`);
  return story;
};

export const getStories = async (type: StoriesType, page: number = 1, limit: number = 20): Promise<{ stories: Story[]; totalPages: number }> => {
  const storyIds = await getStoryIds(type);
  const totalStories = storyIds.length;
  const totalPages = Math.ceil(totalStories / limit);
  console.log('totalPages', totalPages);
  
  const paginatedIds = storyIds.slice((page - 1) * limit, page * limit);
  const stories = await Promise.all(
    paginatedIds.map(async (id) => {
      return getStory(id);
    })
  );

  return {stories, totalPages};
};

