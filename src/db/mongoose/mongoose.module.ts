import { Module, Global, OnModuleInit } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { MongooseService } from './mongoose.service';
import { LogService } from '../../log/log.service';

@Global()
@Module({
  providers: [MongooseService, LogService],
  exports: [MongooseService],
})
export class MongooseModule implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    private readonly logService: LogService,
    ) {}

  async onModuleInit() {
    try {
      const uri = this.configService.get<string>('MONGO_URI');
      await mongoose.connect(uri);
      this.logService.log('Connected to MongoDB', 'MongooseModule');
    } catch (error) {
      this.logService.error(error.message, error.stack, 'MongooseModule');
    }
  }
}
