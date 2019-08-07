import { res, getReqObject, getMockCalls, IReqOpts } from '../__mocks__';
import articlesRoute from '../../api/routes/articles';
import Blog from '../../db/models/Blog';
import { mockNewArticleBody } from '../__mocks__/articles';

describe('Article Route', () => {
  beforeEach(jest.clearAllMocks);
  describe('GET /articles', () => {
    const reqOpts: IReqOpts = {
      method: 'GET',
      url: '/api/v1/articles'
    };
    const req = getReqObject(reqOpts);
    it('should get all articles', async () => {
      await articlesRoute(req, res);
      const resObj = getMockCalls(res.json);
      expect(Object.keys(resObj)).toEqual(['success', 'message', 'data']);
      expect(resObj.data).toHaveProperty('articles');
      expect(Array.isArray(resObj.data.articles)).toEqual(true);
      const article = resObj.data.articles[0];

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
    const reqOpts: IReqOpts = {
      method: 'POST',
      body: mockNewArticleBody,
      url: '/api/v1/articles'
    };

    it('should successfully add an article to the db', async () => {
      const req = getReqObject(reqOpts);

      await articlesRoute(req, res);
      const allArticles = await Blog.find();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(allArticles.length).toEqual(4);
    });

    it('should respond with the newly added article', async () => {
      const req = getReqObject({
        ...reqOpts,
        body: { ...reqOpts.body, title: 'Second Article From Test' }
      });

      await articlesRoute(req, res);
      const resObj = getMockCalls(res.json);
      expect(resObj.data).toHaveProperty('article');
      expect(resObj.data.article.title).toEqual('Second Article From Test');
    });
  });

  describe('GET /articles/<id>', () => {
    const reqOpts: IReqOpts = {
      method: 'GET',
      url: ''
    };
    it('should get a single article', async () => {
      const articleId = (await Blog.create(mockNewArticleBody))._id;
      const req = getReqObject({
        ...reqOpts,
        url: `/api/v1/articles/${articleId}`
      });

      await articlesRoute(req, res);
      const resObj = getMockCalls(res.json);
      expect(resObj.data).toHaveProperty('article');
      expect(Object.keys(resObj.data.article.toObject())).toEqual([
        '_id',
        'title',
        'author',
        'body',
        'date',
        '__v'
      ]);
    });

    it('should return correct response for invalid route', async () => {
      const req = getReqObject({
        ...reqOpts,
        url: '/api/v1/articles/thisarticleidiswrong'
      });

      await articlesRoute(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      const resObj = getMockCalls(res.json);
      expect(resObj.message).toEqual('Invalid route');
    });

    it('should return 404 for articles which donot exist', async () => {
      const req = getReqObject({
        ...reqOpts,
        url: '/api/v1/articles/5d49636252a16d555d073902'
      });

      await articlesRoute(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      const resObj = getMockCalls(res.json);
      expect(resObj.message).toEqual('No such article exists');
    });
  });

  describe('PUT /articles/<id>', () => {
    const reqOpts: IReqOpts = {
      url: '/api/v1/articles',
      method: 'PUT'
    };
    it('should respond correctly for invalid url path', async () => {
      const req = getReqObject(reqOpts);

      await articlesRoute(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid route'
      });
    });

    it("should not update an article which doesn't exist", async () => {
      const req = getReqObject({
        ...reqOpts,
        url: '/api/v1/articles/5d49636252a16d555d073902'
      });

      await articlesRoute(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'No such article exists'
      });
    });

    it('should successfully update an article', async () => {
      const articleId = (await Blog.create(mockNewArticleBody))._id;
      const req = getReqObject({
        ...reqOpts,
        url: `/api/v1/articles/${articleId}`,
        body: {
          title: 'Updated Title'
        }
      });

      await articlesRoute(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      const resObj = getMockCalls(res.json);
      expect(Object.keys(resObj)).toEqual(['success', 'message', 'data']);
      expect(resObj.data).toHaveProperty('article');
      const article = resObj.data.article.toObject();
      expect(Object.keys(article)).toEqual([
        '_id',
        'title',
        'author',
        'body',
        'date',
        '__v'
      ]);
      expect(article.title).toEqual('Updated Title');
    });
  });

  describe('DELETE /articles/<id>', () => {
    const reqOpts: IReqOpts = {
      url: '/api/v1/articles/<articleid>',
      method: 'DELETE'
    };

    it('should not delete article with invalid id', async () => {
      const req = getReqObject(reqOpts);

      await articlesRoute(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid route'
      });
    });

    it('should successfully delete an article', async () => {
      const articleId = (await Blog.create(mockNewArticleBody))._id;
      const req = getReqObject({
        ...reqOpts,
        url: `/api/v1/articles/${articleId}`
      });

      await articlesRoute(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
    });
  });

  describe('Invalid HTTP Method', () => {
    const reqOpts: IReqOpts = {
      url: '/api/v1',
      method: 'PATCH'
    };

    it('should respond correctly for invalid http method', async () => {
      const req = getReqObject(reqOpts);

      await articlesRoute(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid route'
      });
    });
  });
});
