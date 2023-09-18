import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';
import { PlayersModule } from './players/players.module';

async function bootstrap() {
  const app = await NestFactory.create(PlayersModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //forbidNonWhitelisted: true, //directamente frena el proceso
    }),
  );
  // app.setGlobalPrefix("api");
  await app.listen(3000);
}
bootstrap();
