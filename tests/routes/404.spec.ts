import notFoundRoute from '../../api/routes/404';
import { getReqObject, res } from '../__mocks__';

describe('404 Route', () => {
  const req = getReqObject();
  it('should return the correct response', () => {
    notFoundRoute(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid route. Access the API at /api/v1',
      success: false
    });
  });
});
