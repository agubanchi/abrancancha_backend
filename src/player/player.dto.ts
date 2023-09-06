// npm install class-validator class-transformer
import { IsString, IsNumber, IsPhoneNumber, IsEmail, IsUrl } from "class-validator";

export class PlayerDto {
    // id: number; <-esto no se precisa
    @IsString()
    nombre: string;
    @IsString()
    apellido: string;
    @IsEmail()
    email: string;
    @IsPhoneNumber()
    telefono: number;
    @IsNumber()
    categoria: number;
    @IsUrl()
    avatar: string;
}
