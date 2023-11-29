import {
    Get, Post, Delete, Put, 
    Controller, Param, Body, Query,
    HttpCode, HttpStatus, ParseIntPipe,
  } from '@nestjs/common';
  import { TiposCanchaService } from './tipos-Cancha.service';
  import { TipoCancha } from 'src/tipo-Cancha/tipo-Cancha.interface';
  import { TipoCanchaDto } from 'src/tipo-Cancha/tipo-Cancha.dto';
@Controller('/tipos-cancha')
export class TiposCanchaController {
    constructor(private readonly TiposCanchaService: TiposCanchaService) { }

    // @Get()
  // getTiposCancha(): Promise<TipoCancha[]> {
  //   return this.TiposCanchaService.getTiposCancha();
  // }
  // @Get('filter') //<-otra opcion: https://platzi.com/clases/2272-nestjs/37076-get-parametros-query/
  // getTipoCanchaByName(@Query(new ValidationPipe()) tipoCanchaName?: QueryTipoCanchaDto): Promise<TipoCancha[]> {
  @Get()
  getTiposCancha(@Query('name') tipoCanchaName?: string): Promise<TipoCancha[]> {    
    if (!tipoCanchaName) return this.TiposCanchaService.getTiposCancha();
    return this.TiposCanchaService.getTipoCanchaByName(tipoCanchaName)
  }

  @Get(':id')
  getTiposCanchaById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })
    ) id: number): Promise<TipoCancha[]> {
    return this.TiposCanchaService.getTiposCanchaById(id);
  }

  @Post()
  createTipoCancha(@Body() tipoCanchaDto: TipoCanchaDto): Promise<any> {
    return this.TiposCanchaService.createTipoCancha(tipoCanchaDto);
  }

  @Delete(':id')
  deleteTipoCanchaById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number): Promise<void> {
    return this.TiposCanchaService.deleteTiposCanchaById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // @HttpCode(204)
  replaceTiposCanchaByid(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body() tipoCanchaDto: TipoCanchaDto,
  ): Promise<void> {
    return this.TiposCanchaService.replaceTiposCanchaByid(id, tipoCanchaDto);
  }
}