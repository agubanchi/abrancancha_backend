import {
    Get, Post, Delete, Put, 
    Controller, Param, Body, Query,
    HttpCode, HttpStatus, ParseIntPipe,
} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservaDto } from 'src/reserva/reserva.dto';
import { Reserva } from 'src/reserva/reserva.interface';

@Controller('/reservas')
export class ReservasController {
    constructor(private readonly ReservasService: ReservasService) { }
    @Get()
    getReservas(@Query('name') reservaName?: string): Promise<Reserva[]> {
        // if (!reservaName) 
        return this.ReservasService.getReservas();
        // return this.ReservasService.getReservaByName(reservaName)
    }

    @Get(':id')
    getReservasById(
        @Param('id', new ParseIntPipe({
            errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
        })
        ) id: number): Promise<Reserva[]> {
        return this.ReservasService.getReservasById(id);
    }

    @Post()
    createReserva(@Body() reservaDto: ReservaDto): Promise<any> {
        return this.ReservasService.createReserva(reservaDto);
    }

    @Delete(':id')
    deleteReservaById(
        @Param('id', new ParseIntPipe({
            errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
        })) id: number): Promise<void> {
        return this.ReservasService.deleteReservasById(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // @HttpCode(204)
    replaceReservasByid(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
        @Body() reservaDto: ReservaDto,
    ): Promise<void> {
        return this.ReservasService.replaceReservasByid(id, reservaDto);
    }
}
