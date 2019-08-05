import { getIdFromPath } from '../../utils/index';

describe('Utils', () => {
  it('should correctly return id from the specified path', () => {
    const path = '/api/v1/articles/5d41689f2e9e3b07f0281170';
    const id = getIdFromPath(path);

    expect(id).toEqual('5d41689f2e9e3b07f0281170');
  });
});
