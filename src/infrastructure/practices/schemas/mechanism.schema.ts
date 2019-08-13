import * as mongoose from 'mongoose';
import { agencySchema } from './agency.schema';

export const mechanismSchema = new mongoose.Schema({
  _id: String,
  name: String,
  implementationName: String,
  display: String,
  agency: agencySchema,
});
