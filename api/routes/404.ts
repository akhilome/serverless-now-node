import { NowRequest, NowResponse } from '@now/node';

export default (req: NowRequest, res: NowResponse): NowResponse => {
  return res.status(404).json({
    success: false,
    message: 'Invalid route. Access the API at /api/v1'
  });
};
