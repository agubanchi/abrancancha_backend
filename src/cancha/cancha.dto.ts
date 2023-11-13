/* eslint-disable prettier/prettier */
// npm install class-validator class-transformer
import { Type } from 'class-transformer';
import {
  IsString, IsNumber, IsBoolean,
  IsNotEmpty, MaxLength, MinLength,
} from 'class-validator';

export class CanchaDto {
  // id: number; <-esto no se precisa

  @IsNotEmpty()
  @IsNumber()
  idClub: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  numero: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  idTipo: number;

  @IsNotEmpty()
  @IsNumber()
  tarifa: number;

  @IsNotEmpty()
  @IsBoolean()
  rating: number;

  @IsString()
  @MaxLength(100)
  observaciones: string;

  @IsNotEmpty()
  @IsBoolean()
  activa: boolean

  // @IsOptional()
}
