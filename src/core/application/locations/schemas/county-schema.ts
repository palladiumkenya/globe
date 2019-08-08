import * as mongoose from 'mongoose';

export const countySchema = new mongoose.Schema({
  code: Number,
  name: String,
});
