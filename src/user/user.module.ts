import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { LogService } from 'src/log/log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ 
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, LogService]
})
export class UserModule {}