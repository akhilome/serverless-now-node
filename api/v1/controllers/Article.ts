import { NowRequest, NowResponse } from '@now/node';

import '../../../db/config';
import Blog from '../../../db/models/Blog';

class ArticleController {
  static async addArticle(
    req: NowRequest,
    res: NowResponse
  ): Promise<NowResponse> {
    const {
      body: { title, author, body }
    } = req;

    const article = new Blog({ title, author, body });
    article.save();

    return res.status(200).json({
      success: true,
      message: 'New article',
      data: { article }
    });
  }
}
export default ArticleController;
