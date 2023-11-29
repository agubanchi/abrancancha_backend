import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, MinLength, } from 'class-validator';

export class TipoCanchaDto {
  // id: number; <-esto no se precisa

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(65)
  nombre: string;
}
