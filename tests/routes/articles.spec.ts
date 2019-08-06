import { res, getReqObject, getMockCalls } from '../__mocks__';
import articlesRoute from '../../api/routes/articles';
import Blog from '../../db/models/Blog';
import { mockNewArticleBody } from '../__mocks__/articles';

describe('Article Route', () => {
  beforeEach(jest.clearAllMocks);
  describe('GET /articles', () => {
    const req = getReqObject();
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

  describe('POST /articles', () => {
    it('should successfully add an article to the db', async () => {
      const req = getReqObject();
      req.method = 'POST';
      req.body = mockNewArticleBody;

      await articlesRoute(req, res);
      const allArticles = await Blog.find();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(allArticles.length).toEqual(4);
    });

    it('should respond with the newly added article', async () => {
      const req = getReqObject();
      req.method = 'POST';
      req.body = { ...mockNewArticleBody, title: 'Second Article From Test' };

      await articlesRoute(req, res);
      const jsonArg = getMockCalls(res.json, 0);
      expect(jsonArg.data).toHaveProperty('article');
      expect(jsonArg.data.article.title).toEqual('Second Article From Test');
    });
  });
});
