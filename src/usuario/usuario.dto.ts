// npm install class-validator class-transformer
import { Type } from 'class-transformer';
import {
  IsString, IsNumber, IsPhoneNumber, IsEmail, IsStrongPassword,
  IsNotEmpty, MaxLength, MinLength, 
} from 'class-validator';

export class UsuarioDto {
  // id: number; <-esto no se precisa
  // "id": 1,
  // "nombre": "Usuario Uno",
  // "password": "aA@1234",
  // "email": "usuario1@example.com",
  // "telefono": "123-456-7890",
  // "estado": "activo"
  
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  nombre: string;

  // @IsNotEmpty()
  // @IsString()
  // apellido: string;
  
  @IsNotEmpty()
  // @IsString()
  @IsStrongPassword()
  password:string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @IsPhoneNumber()
  // @Type(() => Number) // para que esto funcione hay que usar: new ValidationPipe({ transform: true }) en las llamadas
  // @IsNumber()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  telefono: number;

  @IsNotEmpty()
  @IsNumber()
  @IsString()
  estado: number;
  
  // @IsOptional()
  // @IsUrl()
  // avatar: string;
}
