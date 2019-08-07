import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_URL || ''
    : process.env.DB_URL || '';

mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
