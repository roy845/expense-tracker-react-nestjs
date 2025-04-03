import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { CredentialsMiddleware } from './middlewares/CredentialsMiddleware';
import { allowedOrigins } from './config/allowedOrigins';
import { MongoDBExceptionFilter } from './filters/mongodb-exception.filter';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '50mb' }));
  // Middleware
  app.use(cookieParser());
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.use(new CredentialsMiddleware().use);
  app.useGlobalFilters(new MongoDBExceptionFilter());
  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );
  // CORS Configuration
  app.enableCors({
    origin: allowedOrigins,
  });

  // Start Server
  await app.listen(process.env.PORT || 5001);
}
bootstrap();
