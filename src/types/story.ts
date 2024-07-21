export interface Story {
  id: number;
  title: string;
  text?: string;
  by: string;
  score: number;
  time: number;
  url?: string;
  kids?: number[];
  type: 'story' | 'comment';
}

  export type StoriesType = 'top' | 'new' | 'best'

  export type NavigationStateType = {
    key: string;
    title: string;
}

export type StoryCategory = {
    init: boolean;
    page: number,
    totalPages: number,
    stories: Story[];
  }
  
 export interface StoriesData {
    newStories: StoryCategory;
    bestStories: StoryCategory;
    topStories: StoryCategory;
  }

