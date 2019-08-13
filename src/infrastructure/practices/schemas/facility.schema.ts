import * as mongoose from 'mongoose';
import { mechanismSchema } from './mechanism.schema';
import { countySchema } from '../../locations/schemas/county.schema';

export const facilitySchema = new mongoose.Schema({
  _id: String,
  code: Number,
  name: String,
  county: countySchema,
  mechanism: mechanismSchema,
});
