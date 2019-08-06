import { req, res } from '../__mocks__';
import notFoundRoute from '../../api/routes';

describe('404 Route', () => {
  it('should return the correct response', () => {
    notFoundRoute(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'API v1 working alright! 😀'
    });
  });
});
