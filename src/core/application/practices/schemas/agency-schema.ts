import * as mongoose from 'mongoose';

export const agencySchema = new mongoose.Schema({
  id: String,
  name: String,
  display: String,
});
