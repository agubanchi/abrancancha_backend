import {
    Get, Post, Delete, Put, Patch,
    Controller, Param, Body, Query,
    HttpCode, HttpStatus, ParseIntPipe,
} from '@nestjs/common';
import { AgendasService } from './agendas.service';
import { Agenda } from 'src/agenda/agenda.interface';
import { AgendaDto } from 'src/agenda/agenda.dto';

@Controller('/agendas')
export class AgendasController {
    constructor(private readonly AgendasService: AgendasService) { }

    @Get()
    getAgendas(@Query('name') agendaName?: string): Promise<Agenda[]> {
        // if (!agendaName) 
        return this.AgendasService.getAgendas();
        // return this.AgendasService.getAgendaByName(agendaName)
    }

    @Get(':id')
    getAgendasById(
        @Param('id', new ParseIntPipe({
            errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
        })
        ) id: number): Promise<Agenda[]> {
        return this.AgendasService.getAgendasById(id);
    }

    @Post()
    createAgenda(@Body() agendaDto: AgendaDto): Promise<any> {
        return this.AgendasService.createAgenda(agendaDto);
    }

    @Delete(':id')
    deleteAgendaById(
        @Param('id', new ParseIntPipe({
            errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
        })) id: number): Promise<void> {
        return this.AgendasService.deleteAgendasById(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // @HttpCode(204)
    replaceAgendasByid(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
        @Body() agendaDto: AgendaDto,
    ): Promise<void> {
        return this.AgendasService.replaceAgendasByid(id, agendaDto);
    }
}
