import { getComments } from "../../src/services/apis";
import { Comment } from "../../src/types/story";
import { delayedResponse } from "../utils";

describe('Comment API Tests', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });
  
    it('fetches a comment successfully', async () => {
      const mockComment: Comment = {
        id: 2921983,
        by: 'norvig',
        text: 'Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I\'ll keep writing if you keep reading. K?',
        time: 1314211127,
        type: 'comment',
        parent: 2921506,
        kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141]
      };
  
      fetchMock.mockResponseOnce(JSON.stringify(mockComment));
  
      const comment = await getComments(2921983);
      expect(comment).toEqual(mockComment);
    });

    it('handles 404 response', async () => {
      fetchMock.mockResponseOnce('', { status: 404 });
  
      await expect(getComments(2921983)).rejects.toThrow('Network response was not ok');
    });
  
    it('handles fetching errors', async () => {
      fetchMock.mockRejectOnce(new Error('API Error'));
  
      await expect(getComments(2921983)).rejects.toThrow('API Error');
    });
  
    it('handles slow network response', async () => {
        const mockComment: Comment = {
          id: 2921983,
          by: 'norvig',
          text: 'Slow response test',
          time: 1314211127,
          type: 'comment',
          parent: 2921506,
          kids: [2922097, 2922429, 2924562]
        };

        fetchMock.mockImplementationOnce(() => delayedResponse(JSON.stringify(mockComment), 1000));
    
        const comment = await getComments(2921983);
        expect(comment).toEqual(mockComment);
      });
  });