import Blog from '../../../db/models/Blog';

describe('Blog Model', () => {
  const post = {
    title: 'Test Post',
    author: 'Tester',
    body: 'This is a test article from the test environment'
  };

  it('should create appropriate blog document', async () => {
    const blogPost = new Blog(post).toObject();
    expect(Object.keys(blogPost)).toEqual([
      '_id',
      'title',
      'author',
      'body',
      'date'
    ]);
  });
});
