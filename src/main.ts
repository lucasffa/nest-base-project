import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import * as cookieParser from 'cookie-parser';
//import * as csurf from 'csurf';
const helmet = require('helmet');
import { ConfigService } from '@nestjs/config';
import { LogService } from './log/log.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logService = app.get(LogService);

  const config = new DocumentBuilder()
    .setTitle('nest-base-project')
    .setDescription('This API\'s description')
    .setVersion('1.0')
    .addTag('DOCS')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'BearerAuth', // Name of the security scheme (can be any name)
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', 'http://localhost:5000'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  if (configService.get<string>('NODE_ENV') === 'production') {
    app.use(helmet());
  }
  

  /*app.use(cookieParser(configService.get<string>('COOKIE_SECRET')));
  app.use(csurf({
    cookie: false
  }));*/

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  const port = configService.get<number>('PORT', 3000);

  await app.listen(port, '0.0.0.0');
  logService.log(`\n Application is running! \n The URL is: ${await app.getUrl()} \n\n`, 'main.ts');
}
bootstrap();