/* eslint-disable @typescript-eslint/no-unused-vars */
import { Get, Controller, Param } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from 'src/player/player';

@Controller('/players')
export class PlayersController {
  constructor(private readonly PlayersService: PlayersService) {}
  @Get()
  getPlayers(): Promise<Player[]> {
    return this.PlayersService.getPlayers();
  }
  @Get(':id')
  getPlayersById(@Param('id') id: number): Promise<Player[]> {
    return this.PlayersService.getPlayersById(id);
  }
}
