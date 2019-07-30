import { NowRequest, NowResponse } from '@now/node';
import ArticleController from '../controllers/Article';

// matches /api/v1/articles/<mongo_objectid>
const singleArticlePath = new RegExp(/^\/\w{3}\/\w{2}\/\w{8}\/\w{24}\/?$/);
// matches /api/v1/articles
const allArticlesPath = new RegExp(/^\/\w{3}\/\w{2}\/\w{8}\/?$/);

const handleGetRequests = async (
  requestUrl: string,
  req: NowRequest,
  res: NowResponse
): Promise<NowResponse> => {
  if (singleArticlePath.test(requestUrl)) {
    const singleArticleResponse = await ArticleController.getArticle(req, res);
    return singleArticleResponse;
  }

  if (allArticlesPath.test(requestUrl)) {
    const allArticlesResponse = await ArticleController.getArticles(req, res);
    return allArticlesResponse;
  }

  return res.status(404).json({
    success: false,
    message: 'Invalid route'
  });
};

export default async (
  req: NowRequest,
  res: NowResponse
): Promise<NowResponse> => {
  const { method, url = '' } = req;

  switch (method) {
    case 'POST':
      const newArticleResponse = await ArticleController.addArticle(req, res);
      return newArticleResponse;

    case 'GET':
      const getArticlesResponse = await handleGetRequests(url, req, res);
      return getArticlesResponse;

    case 'PUT':
      if (!singleArticlePath.test(url)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid route'
        });
      }
      const updatedArticleResponse = await ArticleController.updateArticle(
        req,
        res
      );
      return updatedArticleResponse;

    default:
      return res.status(404).json({
        success: false,
        message: 'Invalid route'
      });
  }
};
