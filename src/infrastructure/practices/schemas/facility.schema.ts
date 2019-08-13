import * as mongoose from 'mongoose';
import { mechanismSchema } from './mechanism.schema';

export const facilitySchema = new mongoose.Schema({
  id: { type: [String], index: true },
  code: Number,
  name: {type: [String], index: true},
  mechanism: mechanismSchema,
});
