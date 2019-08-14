import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
import { countySchema } from '../../locations/schemas/county.schema';
import { Mechanism } from '../../../domain/practices/mechanism';

export const facilitySchema = new mongoose.Schema({
  _id: String,
  code: Number,
  name: String,
  county: countySchema,
  mechanism: { type: String, ref: Mechanism.name },
});
