import { Injectable } from '@nestjs/common';
import { LogModel } from '../../log/log.model';

@Injectable()
export class MongooseService {
  async saveLog(logEntry) {
    const log = new LogModel(logEntry);
    await log.save();
  }
}
