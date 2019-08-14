import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Mechanism } from '../../../domain/practices/mechanism';

export const agencySchema = new mongoose.Schema({
  _id: String,
  name: String,
  display: String,
  mechanisms: [{ type: String, ref: Mechanism.name }],
});
