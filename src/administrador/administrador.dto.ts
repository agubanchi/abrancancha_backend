/* eslint-disable prettier/prettier */
// npm install class-validator class-transformer
import { IsNumber, IsNotEmpty } from 'class-validator';

export class AdministradorDto {
  // id: number; <-esto no se precisa

  @IsNumber()
  @IsNotEmpty()
  idUsuario: number;

  @IsNotEmpty()
  @IsNumber()
  idClub: number;
}
