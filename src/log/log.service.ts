import { Injectable, Logger } from '@nestjs/common';
import { MongooseService } from '../db/mongoose/mongoose.service'; 

@Injectable()
export class LogService extends Logger {
  constructor(
    private mongooseService: MongooseService,
    ) {
    super();
  }

  private async saveLog(logEntry) {
    try {
      await this.mongooseService.saveLog(logEntry);
    } catch (error) {
      console.log(error);
    }
  }

  log(message: string, context?: string, additionalContext?: Record<string, any>) {
    const logEntry = {
      level: 'log',
      message,
      context,
      additionalContext,
    };
    this.saveLog(logEntry);
    super.log(logEntry.message, logEntry.context);
  }

  error(message: string, trace: string, context?: string, additionalContext?: Record<string, any>) {
    const logEntry = {
      level: 'error',
      message,
      trace,
      context,
      additionalContext,
    };
    this.saveLog(logEntry);
    super.error(logEntry.message, logEntry.trace, logEntry.context);
  }

  warn(message: string, context?: string, additionalContext?: Record<string, any>) {
    const logEntry = {
      level: 'warn',
      message,
      context,
      additionalContext,
    };
    this.saveLog(logEntry);
    super.warn(logEntry.message, logEntry.context);
  }

  debug(message: string, context?: string, additionalContext?: Record<string, any>) {
    const logEntry = {
      level: 'debug',
      message,
      context,
      additionalContext,
    };
    //this.saveLog(logEntry);
    super.debug(logEntry.message, logEntry.context);
  }

  verbose(message: string, context?: string, additionalContext?: Record<string, any>) {
    const logEntry = {
      level: 'verbose',
      message,
      context,
      additionalContext,
    };
    this.saveLog(logEntry);
    super.verbose(logEntry.message, logEntry.context);
  }
}
