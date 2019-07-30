import { NowRequest, NowResponse } from '@now/node';

import '../../db/config';
import Blog from '../../db/models/Blog';
import { getIdFromPath } from '../../utils';

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

    try {
      const article = await Blog.findById(articleId);
      if (!article)
        return res.status(404).json({
          success: false,
          message: 'No such article exists'
        });

      return res.status(200).json({
        success: true,
        message: 'Article retrieved',
        data: { article }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong processing your request'
      });
    }
  }

  static async updateArticle(
    req: NowRequest,
    res: NowResponse
  ): Promise<NowResponse> {
    const { url = '' } = req;
    const articleId = getIdFromPath(url);

    try {
      const articleExists = await Blog.findById(articleId);

      if (!articleExists)
        return res.status(404).json({
          success: false,
          message: 'No such article exists'
        });

      const {
        title = articleExists.title,
        body = articleExists.body
      } = req.body;

      const article = await Blog.findByIdAndUpdate(
        articleId,
        { title, body },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: 'Article updated',
        data: { article }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong processing your request'
      });
    }
  }

  static async deleteArticle(
    req: NowRequest,
    res: NowResponse
  ): Promise<NowResponse> {
    const { url = '' } = req;
    const articleId = getIdFromPath(url);

    try {
      await Blog.findByIdAndRemove(articleId);
      return res.status(204).json({
        success: true,
        message: 'Article removed'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong processing your request'
      });
    }
  }
}

export default ArticleController;
