import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';
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
export class AppModule {}
