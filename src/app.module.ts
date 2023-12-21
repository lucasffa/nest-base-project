import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import { RateLimitingGuard } from './common/guards/rate-limiting.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ConfigurationSchema } from './config/configuration.schema';
import { LogService } from './log/log.service';
import { MongooseModule } from './db/mongoose/mongoose.module';
import { LogModule } from './log/log.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, any>) => {
        const validatedConfig = plainToClass(ConfigurationSchema, config, {
          enableImplicitConversion: true,
        });
        const errors = validateSync(validatedConfig, { skipMissingProperties: false });
        if (errors.length > 0) {
          throw new Error(`Configuration validation error: ${errors.toString()}`);
        }
        return validatedConfig;
      },
    }),
    MongooseModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as any,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    UserModule,
    AuthModule,
    CacheModule.register({
        ttl: 60 * 1000,
        isGlobal: true,
    }),
    LogModule,
    
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    PermissionsGuard,
    {
      provide: 'APP_GUARD',
      useClass: RateLimitingGuard,
    },
    LogService,
  ],
})
export class AppModule {}