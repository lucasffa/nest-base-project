// src/config/configuration.schema.ts

import { IsNumber, IsString, IsOptional } from 'class-validator';

export class ConfigurationSchema {
  @IsString()
  JWT_SECRET: string;

  @IsString()
  DB_TYPE: string;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  @IsNumber()
  @IsOptional()
  PORT: number;

  @IsString()
  @IsOptional()
  CORS_ORIGIN: string;

  @IsString()
  NODE_ENV: string;

  @IsString()
  COOKIE_SECRET: string;

  @IsString()
  MONGO_URI: string;
}
