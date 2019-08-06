import { req, res, getMockCalls } from '../__mocks__';
import articlesRoute from '../../api/routes/articles';

describe('Article Route', () => {
  describe('GET /articles', () => {
    req.method = 'GET';
    req.url = '/api/v1/articles';
    it('should get all articles', async () => {
      await articlesRoute(req, res);
      const jsonArg = getMockCalls(res.json, 0);
      expect(Object.keys(jsonArg)).toEqual(['success', 'message', 'data']);
      expect(jsonArg.data).toHaveProperty('articles');
      expect(Array.isArray(jsonArg.data.articles)).toEqual(true);
      const article = jsonArg.data.articles[0];

      expect(Object.keys(article.toObject())).toEqual([
        '_id',
        'title',
        'author',
        'body',
        'date',
        '__v'
      ]);
    });
  });
});
