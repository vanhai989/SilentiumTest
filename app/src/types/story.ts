export interface Story {
    id: number;
    title: string;
    text: string;
    kids: number[];
  }

  export type StoriesType = 'top' | 'new' | 'best'

  export type NavigationStateType = {
    key: string;
    title: string;
}

export type StoryCategory = {
    init: boolean;
    stories: Story[];
  }
  
 export interface StoriesData {
    newStories: StoryCategory;
    bestStories: StoryCategory;
    topStories: StoryCategory;
  }


