/* eslint-disable @typescript-eslint/no-unused-vars */
import { Get, Controller, Param, Post, Body } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Players } from './players.interface';

@Controller('players')
export class PlayersController {
  constructor(private readonly PlayersService: PlayersService) {}
  @Get('/players')
  getPlayers(): Promise<Players[]> {
    return this.PlayersService.getPlayers();
  }
  @Get('/players/:id')
  getPlayersById(@Param('id') id: number): Promise<Players[]> {
    return this.PlayersService.getPlayersById(id);
  }

  @Post()
  createPlayer(@Body() body): Promise<any> {
    return this.PlayersService.createPlayer(body);
  }
}
