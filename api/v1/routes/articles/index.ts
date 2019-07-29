import { NowRequest, NowResponse } from '@now/node';
import ArticleController from '../../controllers/Article';

export default async (
  req: NowRequest,
  res: NowResponse
): Promise<NowResponse> => {
  const { method } = req;

  switch (method) {
    case 'POST':
      const response = await ArticleController.addArticle(req, res);
      return response;

    default:
      return res.status(404).json({
        success: false,
        message: 'Invalid route'
      });
  }
};
