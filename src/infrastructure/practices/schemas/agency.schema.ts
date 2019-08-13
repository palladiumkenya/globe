import * as mongoose from 'mongoose';

export const agencySchema = new mongoose.Schema({
  _id: String,
  name: String,
  display: String,
});
