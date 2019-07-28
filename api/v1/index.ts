import { NowRequest, NowResponse } from '@now/node';

export default (req: NowRequest, res: NowResponse): NowResponse => {
  return res.status(200).json({
    success: true,
    message: 'API v1 working alright! 😀'
  });
};
