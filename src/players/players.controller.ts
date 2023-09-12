/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Get,
  Post,
  Delete,
  Put,
  Controller,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { PlayersService } from './players.service';
// import { Player } from 'src/player/player';
import { Player } from 'src/player/player.interface';

@Controller('/players')
export class PlayersController {
  constructor(private readonly PlayersService: PlayersService) {}
  @Get()
  getPlayers(): Promise<Player[]> {
    return this.PlayersService.getPlayers();
  }
  @Get(':id')
  getPlayersById(@Param('id', ParseIntPipe) id: number): Promise<Player[]> {
    return this.PlayersService.getPlayersById(id);
  }

  @Post()
  // createPlayer(@Body() playerDto: PlayerDto): Promise<any> {
  createPlayer(@Body() body): Promise<any> {
    return this.PlayersService.createPlayer(body);
  }

  // @Delete(':id')
  // deletePlayerById(@Param('id', ParseIntPipe) id: number): Promise<void> {
  //   return this.PlayersService.deletePlayerById(id);
  // }

  // @Put(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)  // @HttpCode(204)
  // updatePlayerById(@Param('id', ParseIntPipe) id: number, @Body() playerDto: PlayerDto): Promise<void> {
  //   return this.PlayersService.updatePlayerById(id, playerDto);
  // }
}
