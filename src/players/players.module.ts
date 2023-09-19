import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot:
        '/' /** para que los endpoints incorrectos no redirijan al home */,
    }) /* PlayerModule, */,
  ],
  controllers: [/* AppController, */ PlayersController],
  providers: [/* AppService, */ PlayersService],
})
export class PlayersModule {}
