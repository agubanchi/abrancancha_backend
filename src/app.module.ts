import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';
import { CanchasController } from './canchas/canchas.controller';
import { CanchasService } from './canchas/canchas.service';
import { ReservasController } from './reservas/reservas.controller';
import { ReservasService } from './reservas/reservas.service';
import { AdministradoresController } from './administradores/administradores.controller';
import { AdministradoresService } from './administradores/administradores.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';
import { AgendasController } from './agendas/agendas.controller';
import { AgendasService } from './agendas/agendas.service';
import { TiposCanchaController } from './tipos-cancha/tipos-cancha.controller';
import { TiposCanchaService } from './tipos-cancha/tipos-cancha.service';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot:
        '/' /** para que los endpoints incorrectos no redirijan al home */,
    }) /* PlayerModule, */,
  ],
  controllers: [/* AppController, */ PlayersController, CanchasController, ReservasController, AdministradoresController, UsuariosController, AgendasController, TiposCanchaController],
  providers: [/* AppService, */ PlayersService, CanchasService, ReservasService, AdministradoresService, UsuariosService, AgendasService, TiposCanchaService],
})
export class AppModule {}
