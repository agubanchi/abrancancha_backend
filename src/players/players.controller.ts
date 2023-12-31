/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
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
  Patch,
} from '@nestjs/common';
import { PlayersService } from './players.service';
// import { Player } from 'src/player/player';
import { Player } from 'src/player/player.interface';
import { PlayerDto } from 'src/player/player.dto';
@Controller('/players')
export class PlayersController {
  constructor(private readonly PlayersService: PlayersService) {}
  @Get()
  getPlayers(): Promise<Player[]> {
    return this.PlayersService.getPlayers();
  }
  @Get(':id')
  // getPlayersById(@Param('id', ParseIntPipe) id: number): Promise<Player[]> {
  getPlayersById(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<Player[]> {
    return this.PlayersService.getPlayersById(id);
  }
  @Post()
  createPlayer(@Body() playerDto: PlayerDto): Promise<any> {
    return this.PlayersService.createPlayer(playerDto);
    // createPlayer(@Body() body): Promise<any> {
    //   return this.PlayersService.createPlayer(body);
  }
  @Delete(':id')
  deletePlayerById(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<void> {
    return this.PlayersService.deletePlayerById(id);
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

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // @HttpCode(204)
  updatePlayersByid(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body() playerDto: PlayerDto,
  ): Promise<void> {
    return this.PlayersService.updatePlayersById(id, playerDto);
  }
}
