import { NowRequest, NowResponse } from '@now/node';

//@ts-ignore
export const res: NowResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};

//@ts-ignore
export const getReqObject = (): NowRequest => ({
  method: 'GET',
  body: {},
  url: ''
});

export const getMockCalls = (mockedObj: any, arg = 0): any => {
  return mockedObj.mock.calls[0][arg];
};
