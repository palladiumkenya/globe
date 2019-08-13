import * as mongoose from 'mongoose';
import { agencySchema } from './agency.schema';

export const mechanismSchema = new mongoose.Schema({
  id: { type: [String], index: true },
  name: String,
  implementationName: String,
  display: String,
  agency: agencySchema,
});
