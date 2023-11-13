import {
    Get, Post, Delete, Put, 
    Controller, Param, Body, Query,
    HttpCode, HttpStatus, ParseIntPipe,
  } from '@nestjs/common';
  import { UsuariosService } from './usuarios.service';
  import { Usuario } from 'src/usuario/usuario.interface';
  import { UsuarioDto } from 'src/usuario/usuario.dto';
@Controller('/usuarios')
export class UsuariosController {
    constructor(private readonly UsuariosService: UsuariosService) { }

    // @Get()
  // getUsuarios(): Promise<Usuario[]> {
  //   return this.UsuariosService.getUsuarios();
  // }
  // @Get('filter') //<-otra opcion: https://platzi.com/clases/2272-nestjs/37076-get-parametros-query/
  // getUsuarioByName(@Query(new ValidationPipe()) usuarioName?: QueryUsuarioDto): Promise<Usuario[]> {
  @Get()
  getUsuarios(@Query('name') usuarioName?: string): Promise<Usuario[]> {    
    if (!usuarioName) return this.UsuariosService.getUsuarios();
    return this.UsuariosService.getUsuarioByName(usuarioName)
  }

  @Get(':id')
  getUsuariosById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })
    ) id: number): Promise<Usuario[]> {
    return this.UsuariosService.getUsuariosById(id);
  }

  @Post()
  createUsuario(@Body() usuarioDto: UsuarioDto): Promise<any> {
    return this.UsuariosService.createUsuario(usuarioDto);
  }

  @Delete(':id')
  deleteUsuarioById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number): Promise<void> {
    return this.UsuariosService.deleteUsuariosById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // @HttpCode(204)
  replaceUsuariosByid(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body() usuarioDto: UsuarioDto,
  ): Promise<void> {
    return this.UsuariosService.replaceUsuariosByid(id, usuarioDto);
  }
}
