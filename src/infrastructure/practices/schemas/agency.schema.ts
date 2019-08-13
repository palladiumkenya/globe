import * as mongoose from 'mongoose';

export const agencySchema = new mongoose.Schema({
  id: {type: [String], index: true},
  name: String,
  display: String,
});
