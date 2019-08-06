import { res, getReqObject } from '../__mocks__';
import notFoundRoute from '../../api/routes';

describe('Index Route', () => {
  it('should return the correct response', () => {
    const req = getReqObject();
    notFoundRoute(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'API v1 working alright! 😀'
    });
  });
});
