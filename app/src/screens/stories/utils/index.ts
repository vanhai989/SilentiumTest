import isEqual from "lodash.isequal";
import { StoryCategory } from "../../../types/story";

export const areEqual = (prevProps: { stories: StoryCategory }, nextProps: { stories: StoryCategory }): boolean => {
    console.log('prevProps', prevProps.stories);
    console.log('nextProps', nextProps.stories);
    
    return isEqual(prevProps.stories, nextProps.stories);
};