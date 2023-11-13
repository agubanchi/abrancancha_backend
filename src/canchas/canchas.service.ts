import { Injectable, NotFoundException } from '@nestjs/common';
import { CanchaDto } from 'src/cancha/cancha.dto';
import { Cancha } from 'src/cancha/cancha.interface';
const BASE_URL = 'http://localhost:3030/padelcanchas/';
export const CONTENT_TYPE_APPLICATION_JSON = {
    'Content-Type': 'application/json',
};

@Injectable()
export class CanchasService {
    async getCanchaByName(canchaSearch: string): Promise<Cancha[]> {
        if (canchaSearch.trim() === "") return

        const allCanchas = await this.getCanchas();
        //---------------------------------------------------------------------------
        const searchWords: string[] = canchaSearch.trim().toUpperCase().split(" ");
        const matchAll = (texto: string) => searchWords.every(word => texto.includes(word));
        const canchasFiltered = allCanchas.filter(
            cancha => matchAll(cancha.nombre.toUpperCase() + " " + cancha.numero.toUpperCase()));
        //---------------------------------------------------------------------------
        // existen canchas: los retornamos al controller
        if (canchasFiltered.length) return canchasFiltered;
        throw new NotFoundException(`No existen canchas con ese nombre.`);
    }

    async getCanchas(): Promise<Cancha[]> {
        const res = await fetch(BASE_URL);
        const parsed = await res.json();
        return parsed;
    }
    async getCanchasById(id: number): Promise<Cancha[]> {
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json();
        if (Object.keys(parsed).length) return parsed;
        throw new NotFoundException(`Jugador con id ${id} no existe.`)
    }
    // async setNewCancha(cancha: Cancha) {  /* <-- sugerencia de nombre alternativo.---- */
    async createCancha(cancha: CanchaDto) { /*<- no funciona */
        const id = await this.setNewId();

        const { numero, nombre, idTipo, tarifa, rating, observaciones, activa } = cancha;
        const newCancha = { id, numero, nombre, idTipo, tarifa, rating, observaciones, activa };
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: CONTENT_TYPE_APPLICATION_JSON,
            body: JSON.stringify(newCancha),
        });
        const parsed = res.json();
        // if (Object.keys(parsed).length) return parsed;
        // throw new NotFoundException(`Jugador con id ${id} no existe.`)
        return parsed;
    }
    private async setNewId(): Promise<number> {
        const canchas: Cancha[] = await this.getCanchas();
        const lastCancha: Cancha = canchas.pop();
        const id = lastCancha.id + 1;
        return id;
    }

    async deleteCanchasById(id: number): Promise<any> {
        const res = await fetch(BASE_URL + id, {
            method: 'DELETE',
        });
        const parsed = await res.json();
        return parsed;
    }

    async replaceCanchasByid(id: number, canchaDto: CanchaDto): Promise<void> {
        const isCancha = await this.getCanchasById(id);
        if (!Object.keys(isCancha).length)
            throw new NotFoundException(
                `Imposible editar. La cancha con id ${id} no existe.`,
            );
        const { idClub, numero, nombre, idTipo, tarifa, rating, observaciones, activa } = canchaDto;
        const updateCancha = { id, numero, nombre, idTipo, tarifa, rating, observaciones, activa };
        // console.log('updateCancha', updateCancha);
        const res = await fetch(BASE_URL + id, {
            method: 'PUT',
            headers: CONTENT_TYPE_APPLICATION_JSON,
            body: JSON.stringify(updateCancha),
        });
        const parsed = await res.json();
        return parsed;
    }
}
