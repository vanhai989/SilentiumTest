import { Comment, StoriesType, Story } from '../types/story';

import { BASE_URL } from "../utils/constants";
import fetchWrapper from "./baseApi";


const getStoryIds = async (type: StoriesType): Promise<number[]> => {
  const res = await fetchWrapper.fetch<number[]>(`${BASE_URL}${type}stories.json`);
  return res;
};

const getStory = async (id: number): Promise<Story> => {
  const story = await fetchWrapper.fetch<Story>(`${BASE_URL}item/${id}.json`);
  return story;
};

export const getStories = async (type: StoriesType, page: number = 1, limit: number = 20): Promise<{ stories: Story[]; totalPages: number }> => {
  const storyIds = await getStoryIds(type);
  const totalStories = storyIds.length;
  const totalPages = Math.ceil(totalStories / limit);

  if (page < 1 || page > totalPages) {
    throw new Error('Page number out of range');
  }
  const paginatedIds = storyIds.slice((page - 1) * limit, page * limit);
  const stories = await Promise.all(
    paginatedIds.map(async (id) => {
      return getStory(id);
    })
  );

  return {stories, totalPages};
};

export const getComments = async (id: number): Promise<Comment> => {
  const story = await fetchWrapper.fetch<Comment>(`${BASE_URL}item/${id}.json`);
  return story;
};
