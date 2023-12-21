import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { MongooseModule } from '../db/mongoose/mongoose.module'; // Import your custom MongooseModule

@Module({
  imports: [
    MongooseModule
  ],
  providers: [LogService],
  exports: [LogService]
})
export class LogModule {}
