import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface IBlogPost extends mongoose.Document {
  title: string;
  author: string;
  body: string;
}

const blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  date: { type: Date, default: Date.now }
});

const Blog = mongoose.model<IBlogPost>('Blog', blogSchema);

export default Blog;
