import { NowRequest, NowResponse } from '@now/node';

export default (req: NowRequest, res: NowResponse): NowResponse => {
  return res.status(200).json({
    success: true,
    message: 'Access the API at /api/v1'
  });
};
