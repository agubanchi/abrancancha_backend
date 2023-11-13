import { Type } from 'class-transformer';
import {
  IsString, IsNumber, IsPhoneNumber, IsEmail, IsUrl,
  IsNotEmpty, MaxLength, MinLength,
} from 'class-validator';

export class AgendaDto {
  // id: number; <-esto no se precisa

  @IsNotEmpty()
  @IsNumber()
  idCancha: number;

  @IsNotEmpty()
  @IsNumber()
  diaSemana: number;

  @IsNotEmpty()
  @IsNumber()
  horaDesde: number;

  @IsNotEmpty()
  @IsNumber()
  horaHasta: number;
  
  @IsNotEmpty()
  @IsNumber()
  duracion: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  fecha: string;
   
  // @IsOptional()
}
