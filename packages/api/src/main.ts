import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/HttpException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // set a global filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // set a global pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(parseInt(process.env.PORT, 10));
}
bootstrap();
