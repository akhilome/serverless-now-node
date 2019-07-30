import { NowRequest, NowResponse } from '@now/node';

import '../../../db/config';
import Blog from '../../../db/models/Blog';
import { getIdFromPath } from '../../../utils/utils';

class ArticleController {
  static async addArticle(
    req: NowRequest,
    res: NowResponse
  ): Promise<NowResponse> {
    const {
      body: { title, author, body }
    } = req;

    const _article = new Blog({ title, author, body });
    const article = await _article.save({ validateBeforeSave: true });

    return res.status(201).json({
      success: true,
      message: 'New article',
      data: { article }
    });
  }

  static async getArticles(
    req: NowRequest,
    res: NowResponse
  ): Promise<NowResponse> {
    const articles = await Blog.find();

    return res.status(200).json({
      success: true,
      message: 'All articles',
      data: { articles }
    });
  }

  static async getArticle(
    req: NowRequest,
    res: NowResponse
  ): Promise<NowResponse> {
    const { url = '' } = req;
    const articleId = getIdFromPath(url);
    const article = await Blog.findById(articleId);

    return res.status(200).json({
      success: true,
      message: 'Article retrieved',
      data: { article }
    });
  }
}

export default ArticleController;
