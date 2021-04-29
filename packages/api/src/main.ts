import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const port: number = config.get<number>('port');
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/`);
  });
}
bootstrap();
