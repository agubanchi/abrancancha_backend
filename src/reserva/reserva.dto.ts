/* eslint-disable prettier/prettier */
// npm install class-validator class-transformer
import { Type } from 'class-transformer';
import {
  IsString, IsNumber,
  IsNotEmpty, MaxLength, MinLength, IsDateString,
} from 'class-validator';

export class ReservaDto {
  // id: number; <-esto no se precisa
    // "idUsuario": 1,
    // "idCancha": 1,
    // "fecha": "2023-10-21T10:00:00Z",
    // "estado": "confirmada"
  
  @IsNumber()
  @IsNotEmpty()
  idUsuario: number;

  @IsNotEmpty()
  @IsNumber()
  idCancha: number;

  @IsNotEmpty()
  @IsDateString()
  // @IsString()
  fecha: string;

  @IsNotEmpty()
//  @Type(() => Number) // para que esto funcione hay que usar: new ValidationPipe({ transform: true }) en las llamadas
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  estado: string;
  
  // @IsOptional()
  // @IsUrl()
  // avatar: string;
}
