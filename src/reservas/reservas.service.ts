import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservaDto } from 'src/reserva/reserva.dto';
import { Reserva } from 'src/reserva/reserva.interface';
const BASE_URL = 'http://localhost:3030/reservas/';
export const CONTENT_TYPE_APPLICATION_JSON = {
    'Content-Type': 'application/json',
};

@Injectable()
export class ReservasService {
    async getReservas(): Promise<Reserva[]> {
        const res = await fetch(BASE_URL);
        const parsed = await res.json();
        return parsed;
    }

    async getReservasById(id: number): Promise<Reserva[]> {
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json();
        if (Object.keys(parsed).length) return parsed;
        throw new NotFoundException(`Jugador con id ${id} no existe.`)
    }

    async createReserva(reserva: ReservaDto) { /*<- no funciona */
        const id = await this.setNewId();

        const { idUsuario, idCancha, fecha, estado } = reserva;
        const newReserva = { id, idUsuario, idCancha, fecha, estado };
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: CONTENT_TYPE_APPLICATION_JSON,
            body: JSON.stringify(newReserva),
        });
        const parsed = res.json();
        // if (Object.keys(parsed).length) return parsed;
        // throw new NotFoundException(`Jugador con id ${id} no existe.`)
        return parsed;
    }

    private async setNewId(): Promise<number> {
        const reservas: Reserva[] = await this.getReservas();
        const lastReserva: Reserva = reservas.pop();
        const id = lastReserva.id + 1;
        return id;
    }

    async deleteReservasById(id: number): Promise<any> {
        const res = await fetch(BASE_URL + id, {
            method: 'DELETE',
        });
        const parsed = await res.json();
        return parsed;
    }

    async replaceReservasByid(id: number, reservaDto: ReservaDto): Promise<void> {
        const isReserva = await this.getReservasById(id);
        if (!Object.keys(isReserva).length)
            throw new NotFoundException(
                `Imposible editar. La Reserva con N° ${id} no existe.`,
            );
        const { idUsuario, idCancha, fecha, estado } = reservaDto;
        const updateReserva = { id, idUsuario, idCancha, fecha, estado };
        // console.log('updateReserva', updateReserva);
        const res = await fetch(BASE_URL + id, {
            method: 'PUT',
            headers: CONTENT_TYPE_APPLICATION_JSON,
            body: JSON.stringify(updateReserva),
        });
        const parsed = await res.json();
        return parsed;
    }
}
