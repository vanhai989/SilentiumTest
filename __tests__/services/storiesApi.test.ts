import fetchMock from 'jest-fetch-mock';
import { Story } from '../../src/types/story';
import { getStories } from '../../src/services/apis';

fetchMock.enableMocks();

describe('Stories API Tests', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches stories successfully', async () => {
    const mockStoryIds = [1, 2, 3];
    const mockStories: Story[] = mockStoryIds.map(id => ({
      id,
      by: `user${id}`,
      score: id * 10,
      time: Date.now() - (id * 1000),
      title: `Story ${id}`,
      text: `Content for story ${id}`,
      type: 'story',
      kids: []
    }));

    fetchMock.mockResponseOnce(JSON.stringify(mockStoryIds));
    fetchMock.mockResponses(
      JSON.stringify(mockStories[0]),
      JSON.stringify(mockStories[1]),
      JSON.stringify(mockStories[2])
    );

    const result = await getStories('top', 1, 3);

    expect(result).toHaveProperty('stories');
    expect(result.stories).toHaveLength(mockStoryIds.length);
    expect(result.stories).toEqual(mockStories);
    expect(result).toHaveProperty('totalPages', 1);
  });

  it('handles network errors', async () => {
    fetchMock.mockReject(new Error('Network Error'));
    await expect(getStories('top')).rejects.toThrow('Network Error');
  });

  it('handles pagination correctly', async () => {
    const mockStoryIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const mockStories: Story[] = [
      { id: 1, by: "user1", score: 10, time: 1721577079568, title: "Story 1", text: "Content for story 1", type: 'story', kids: [] },
      { id: 2, by: "user2", score: 20, time: 1721577078568, title: "Story 2", text: "Content for story 2", type: 'story', kids: [] },
      { id: 3, by: "user3", score: 30, time: 1721577077568, title: "Story 3", text: "Content for story 3", type: 'story', kids: [] },
      { id: 4, by: "user4", score: 40, time: 1721577076568, title: "Story 4", text: "Content for story 4", type: 'story', kids: [] },
      { id: 5, by: "user5", score: 50, time: 1721577075568, title: "Story 5", text: "Content for story 5", type: 'story', kids: [] },
      { id: 6, by: "user6", score: 60, time: 1721577074568, title: "Story 6", text: "Content for story 6", type: 'story', kids: [] },
      { id: 7, by: "user7", score: 70, time: 1721577073568, title: "Story 7", text: "Content for story 7", type: 'story', kids: [] },
      { id: 8, by: "user8", score: 80, time: 1721577072568, title: "Story 8", text: "Content for story 8", type: 'story', kids: [] },
      { id: 9, by: "user9", score: 90, time: 1721577071568, title: "Story 9", text: "Content for story 9", type: 'story', kids: [] },
      { id: 10, by: "user10", score: 100, time: 1721577070568, title: "Story 10", text: "Content for story 10", type: 'story', kids: [] }
    ];
  
    fetchMock.mockResponseOnce(JSON.stringify(mockStoryIds));
    fetchMock.mockResponses(
        JSON.stringify(mockStories[5]),
        JSON.stringify(mockStories[6]),
        JSON.stringify(mockStories[7]),
        JSON.stringify(mockStories[8]),
        JSON.stringify(mockStories[9])
      );
  
    const result = await getStories('top', 2, 5);
  
    expect(result).toHaveProperty('stories');
    expect(result.stories).toHaveLength(5);
    expect(result.stories).toEqual(mockStories.slice(5, 10));
    expect(result).toHaveProperty('totalPages', 2);
  });

  it('throws an error for an invalid page number', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([1, 2, 3])); // Mock valid IDs response
    // Simulate a response where page 2 doesn't exist
    fetchMock.mockRejectOnce(new Error('Page number out of range'));
    await expect(getStories('top', 2, 2)).rejects.toThrow('Page number out of range');
  });
});
