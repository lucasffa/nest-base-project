import { Document } from 'mongoose';

export interface Log extends Document {
  level: string;
  message: string;
  context?: string;
  additionalContext?: Record<string, any>;
  timestamp?: Date;
}
