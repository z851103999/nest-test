import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionsFilter } from './filter/any-exception.filter';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // log4js
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // 监听所有路由请求，并打印日志
  app.use(logger);
  // 使用全局拦截打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  // 过滤处理其他异常
  app.useGlobalFilters(new AllExceptionsFilter());
  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new HttpExceptionFilter());
  const options = new DocumentBuilder()
    .addBasicAuth()
    .setTitle('Nest zero to one')
    .setDescription('The nest-zero-to-one API description')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3000);
}

bootstrap();
