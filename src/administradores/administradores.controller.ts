import {
    Get, Post, Delete, Put, 
    Controller, Param, Body, Query,
    HttpCode, HttpStatus, ParseIntPipe,
  } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { AdministradorDto } from 'src/administrador/administrador.dto';
import { Administrador } from 'src/administrador/administrador.interface';

@Controller('/administradores')
export class AdministradoresController {
    constructor(private readonly AdministradoresService: AdministradoresService) { }

    // @Get()
  // getAdministradores(): Promise<Administrador[]> {
  //   return this.AdministradoresService.getAdministradores();
  // }
  // @Get('filter') //<-otra opcion: https://platzi.com/clases/2272-nestjs/37076-get-parametros-query/
  // getAdministradorByName(@Query(new ValidationPipe()) administradorName?: QueryAdministradorDto): Promise<Administrador[]> {
    
  @Get()
  getAdministradores(@Query('name') administradorName?: string): Promise<Administrador[]> {    
    // if (!administradorName) 
    return this.AdministradoresService.getAdministradores();
    // return this.AdministradoresService.getAdministradorByName(administradorName)
  }

  @Get(':id')
  getAdministradoresById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })
    ) id: number): Promise<Administrador[]> {
    return this.AdministradoresService.getAdministradoresById(id);
  }

  @Post()
  createAdministrador(@Body() administradorDto: AdministradorDto): Promise<any> {
    return this.AdministradoresService.createAdministrador(administradorDto);
  }

  @Delete(':id')
  deleteAdministradorById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number): Promise<void> {
    return this.AdministradoresService.deleteAdministradoresById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // @HttpCode(204)
  replaceAdministradoresByid(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body() administradorDto: AdministradorDto,
  ): Promise<void> {
    return this.AdministradoresService.replaceAdministradoresByid(id, administradorDto);
  }
}
