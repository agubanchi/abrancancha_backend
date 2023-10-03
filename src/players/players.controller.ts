/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Get, Post, Delete, Put, Patch,
  Controller, Param, Body, Query,
  HttpCode, HttpStatus, ParseIntPipe,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from 'src/player/player.interface';
import { PlayerDto } from 'src/player/player.dto';

@Controller('/players')
export class PlayersController {
  constructor(private readonly PlayersService: PlayersService) { }

  // @Get()
  // getPlayers(): Promise<Player[]> {
  //   return this.PlayersService.getPlayers();
  // }
  // @Get('filter') //<-otra opcion: https://platzi.com/clases/2272-nestjs/37076-get-parametros-query/
  // getPlayerByName(@Query(new ValidationPipe()) playerName?: QueryPlayerDto): Promise<Player[]> {
  @Get()
  getPlayers(@Query('name') playerName?: string): Promise<Player[]> {    
    if (!playerName) return this.PlayersService.getPlayers();
    return this.PlayersService.getPlayerByName(playerName)
  }

  @Get(':id')
  getPlayersById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })
    ) id: number): Promise<Player[]> {
    return this.PlayersService.getPlayersById(id);
  }

  @Post()
  createPlayer(@Body() playerDto: PlayerDto): Promise<any> {
    return this.PlayersService.createPlayer(playerDto);
  }

  @Delete(':id')
  deletePlayerById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number): Promise<void> {
    return this.PlayersService.deletePlayersById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // @HttpCode(204)
  replacePlayersByid(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body() playerDto: PlayerDto,
  ): Promise<void> {
    return this.PlayersService.replacePlayersByid(id, playerDto);
  }

  // @Patch(':id')
  // @HttpCode(HttpStatus.NO_CONTENT) // @HttpCode(204)
  // updatePlayersByid(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({
  //       errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
  //     }),
  //   )
  //   id: number,
  //   @Body() playerDto: PlayerDto,
  // ): Promise<void> {
  //   return this.PlayersService.updatePlayersById(id, playerDto);
  // }
}
