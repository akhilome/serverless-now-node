import { NowRequest, NowResponse } from '@now/node';
import { MongooseDocument } from 'mongoose';

//@ts-ignore
export const req: NowRequest = {
  method: 'GET',
  body: {},
  url: ''
};
//@ts-ignore
export const res: NowResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};

interface IResponseShape {
  success: boolean;
  message: string;
  data?: object;
}

interface IArticlesResShape extends IResponseShape {
  data: {
    articles: MongooseDocument[];
  };
}

export const getMockCalls = (
  mockedObj: any,
  arg: number
): IArticlesResShape => {
  return mockedObj.mock.calls[0][arg];
};
