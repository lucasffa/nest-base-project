import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PermissionsGuard } from './auth/guards/permissions.guard';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '191.101.232.229',
      port: 5432,
      username: 'apiuser',
      password: 'newpassword',
      database: 'db_myserver',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    PermissionsGuard
  ],
})
export class AppModule {}
