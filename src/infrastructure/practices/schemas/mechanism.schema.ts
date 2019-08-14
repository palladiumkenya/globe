import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Agency } from '../../../domain/practices/agency';
import { Facility } from '../../../domain/practices/facility';

export const mechanismSchema = new mongoose.Schema({
  _id: String,
  name: String,
  implementationName: String,
  display: String,
  agency: { type: String, ref: Agency.name },
  facilities: [{ type: String, ref: Facility.name }],
});
