import mongoose from 'mongoose';
import '../db/config';
import Blog from '../db/models/Blog';
import mockArticles from './__mocks__/articles';

(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(mockArticles);
  await mongoose.connection.close();
  console.log('database seeded successfully');
})();
