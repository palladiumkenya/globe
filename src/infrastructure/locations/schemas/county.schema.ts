import * as mongoose from 'mongoose';

export const countySchema = new mongoose.Schema({
  id: String,
  code: Number,
  name: String,
});
