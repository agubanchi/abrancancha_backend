import {
    Get, Post, Delete, Put, Patch,
    Controller, Param, Body, Query,
    HttpCode, HttpStatus, ParseIntPipe,
  } from '@nestjs/common';
  import { CanchasService } from './canchas.service';
  import { Cancha } from 'src/cancha/cancha.interface';
  import { CanchaDto } from 'src/cancha/cancha.dto';

@Controller('/canchas')
export class CanchasController {
    constructor(private readonly CanchasService: CanchasService) { }

  // @Get()
  // getCanchas(): Promise<Cancha[]> {
  //   return this.CanchasService.getCanchas();
  // }
  // @Get('filter') //<-otra opcion: https://platzi.com/clases/2272-nestjs/37076-get-parametros-query/
  // getCanchaByName(@Query(new ValidationPipe()) canchaName?: QueryCanchaDto): Promise<Cancha[]> {
  @Get()
  getCanchas(@Query('name') canchaName?: string): Promise<Cancha[]> {    
    if (!canchaName) return this.CanchasService.getCanchas();
    return this.CanchasService.getCanchaByName(canchaName)
  }

  @Get(':id')
  getCanchasById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })
    ) id: number): Promise<Cancha[]> {
    return this.CanchasService.getCanchasById(id);
  }

  @Post()
  createCancha(@Body() canchaDto: CanchaDto): Promise<any> {
    return this.CanchasService.createCancha(canchaDto);
  }

  @Delete(':id')
  deleteCanchaById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number): Promise<void> {
    return this.CanchasService.deleteCanchasById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // @HttpCode(204)
  replaceCanchasByid(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body() canchaDto: CanchaDto,
  ): Promise<void> {
    return this.CanchasService.replaceCanchasByid(id, canchaDto);
  }
}
