import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from 'filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port: number = config.get<number>('port');
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/`);
  });
}
bootstrap();
