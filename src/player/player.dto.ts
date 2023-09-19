/* eslint-disable prettier/prettier */
// npm install class-validator class-transformer
import {
  IsString,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
export class PlayerDto {
  // id: number; <-esto no se precisa
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(65)
  nombre: string;
  @IsNotEmpty()
  @IsString()
  apellido: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsNumber()
  telefono: number;
  @IsNotEmpty()
  @IsNumber()
  categoria: number;
}
