import { NowRequest, NowResponse } from '@now/node';

//@ts-ignore
export const res: NowResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};

export interface IReqOpts {
  method: string;
  body?: object;
  url: string;
}

const defaultReqOpts: IReqOpts = {
  method: 'GET',
  body: {},
  url: ''
};

export const getReqObject = ({
  method,
  body,
  url
} = defaultReqOpts): NowRequest =>
  //@ts-ignore
  ({
    method,
    body,
    url
  });

export const getMockCalls = (mockedObj: any, arg = 0): any => {
  return mockedObj.mock.calls[0][arg];
};
