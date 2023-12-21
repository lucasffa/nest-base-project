import * as mongoose from 'mongoose';

export const LogSchema = new mongoose.Schema({
  level: String,
  message: String,
  context: String,
  additionalContext: mongoose.Schema.Types.Mixed,
  trace: String,
  timestamp: { type: Date, default: Date.now },
}, { collection: 'logscollection' });

export interface Log extends mongoose.Document {
  level: string;
  message: string;
  context: string;
  additionalContext: any;
  trace: string;
  timestamp: Date;
}

export const LogModel = mongoose.model<Log>('Log', LogSchema);
