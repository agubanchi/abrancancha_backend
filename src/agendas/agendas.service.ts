import { Injectable, NotFoundException } from '@nestjs/common';
import { AgendaDto } from 'src/agenda/agenda.dto';
import { Agenda } from 'src/agenda/agenda.interface';
const BASE_URL = 'http://localhost:3030/agendas/';
export const CONTENT_TYPE_APPLICATION_JSON = {
    'Content-Type': 'application/json',
};

@Injectable()
export class AgendasService {
    // async getAgendaByName(agendaSearch: string): Promise<Agenda[]> {
    //     if (agendaSearch.trim() === "") return

    //     const allAgendas = await this.getAgendas();
    //     //---------------------------------------------------------------------------
    //     const searchWords: string[] = agendaSearch.trim().toUpperCase().split(" ");
    //     const matchAll = (texto: string) => searchWords.every(word => texto.includes(word));
    //     const agendasFiltered = allAgendas.filter(
    //       agenda => matchAll(agenda.nombre.toUpperCase() + " " + agenda.apellido.toUpperCase()));
    //     //---------------------------------------------------------------------------
    //     // existen agendas: los retornamos al controller
    //     if (agendasFiltered.length) return agendasFiltered;
    //     throw new NotFoundException(`No existen jugadores con ese nombre.`);
    //   }

    async getAgendas(): Promise<Agenda[]> {
        const res = await fetch(BASE_URL);
        const parsed = await res.json();
        return parsed;
    }
    async getAgendasById(id: number): Promise<Agenda[]> {
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json();
        if (Object.keys(parsed).length) return parsed;
        throw new NotFoundException(`Jugador con id ${id} no existe.`)
    }
    // async setNewAgenda(agenda: Agenda) {  /* <-- sugerencia de nombre alternativo.---- */
    async createAgenda(agenda: AgendaDto) { /*<- no funciona */
        const id = await this.setNewId();

        const { idCancha, diaSemana, horaDesde, horaHasta, duracion, fecha } = agenda;
        const newAgenda = { id, idCancha, diaSemana, horaDesde, horaHasta, duracion, fecha };
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: CONTENT_TYPE_APPLICATION_JSON,
            body: JSON.stringify(newAgenda),
        });
        const parsed = res.json();
        // if (Object.keys(parsed).length) return parsed;
        // throw new NotFoundException(`Jugador con id ${id} no existe.`)
        return parsed;
    }
    private async setNewId(): Promise<number> {
        const agendas: Agenda[] = await this.getAgendas();
        const lastAgenda: Agenda = agendas.pop();
        const id = lastAgenda.id + 1;
        return id;
    }

    async deleteAgendasById(id: number): Promise<any> {
        const res = await fetch(BASE_URL + id, {
            method: 'DELETE',
        });
        const parsed = await res.json();
        return parsed;
    }

    async replaceAgendasByid(id: number, agendaDto: AgendaDto): Promise<void> {
        const isAgenda = await this.getAgendasById(id);
        if (!Object.keys(isAgenda).length)
            throw new NotFoundException(
                `Imposible editar. La agenda con id ${id} no existe.`,
            );
        const { idCancha, diaSemana, horaDesde, horaHasta, duracion, fecha } = agendaDto;
        const updateAgenda = { id, idCancha, diaSemana, horaDesde, horaHasta, duracion, fecha };
        console.log('updateAgenda', updateAgenda);
        const res = await fetch(BASE_URL + id, {
            method: 'PUT',
            headers: CONTENT_TYPE_APPLICATION_JSON,
            body: JSON.stringify(updateAgenda),
        });
        const parsed = await res.json();
        return parsed;
    }
}
