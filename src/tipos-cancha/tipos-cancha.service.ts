import { Injectable, NotFoundException } from '@nestjs/common';
import { TipoCanchaDto } from 'src/tipo-cancha/tipo-cancha.dto';
import { TipoCancha } from 'src/tipo-cancha/tipo-cancha.interface';
const BASE_URL = 'http://localhost:3030/tipos_cancha/';
export const CONTENT_TYPE_APPLICATION_JSON = {
    'Content-Type': 'application/json',
};

@Injectable()
export class TiposCanchaService {
    async getTipoCanchaByName(tipoCanchaSearch: string): Promise<TipoCancha[]> {
        if (tipoCanchaSearch.trim() === "") return

        const allTiposCancha = await this.getTiposCancha();
        //---------------------------------------------------------------------------
        const searchWords: string[] = tipoCanchaSearch.trim().toUpperCase().split(" ");
        const matchAll = (texto: string) => searchWords.every(word => texto.includes(word));
        const tiposCanchaFiltered = allTiposCancha.filter(
            tipoCancha => matchAll(tipoCancha.nombre.toUpperCase()));
        //---------------------------------------------------------------------------
        // existen tiposCancha: los retornamos al controller
        if (tiposCanchaFiltered.length) return tiposCanchaFiltered;
        throw new NotFoundException(`No existen tiposCancha con ese nombre.`);
    }

    async getTiposCancha(): Promise<TipoCancha[]> {
        const res = await fetch(BASE_URL);
        const parsed = await res.json();
        return parsed;
    }
    async getTiposCanchaById(id: number): Promise<TipoCancha[]> {
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json();
        if (Object.keys(parsed).length) return parsed;
        throw new NotFoundException(`Tipo de cancha con id ${id} no existe.`)
    }
    // async setNewTipoCancha(tipoCancha: TipoCancha) {  /* <-- sugerencia de nombre alternativo.---- */
    async createTipoCancha(tipoCancha: TipoCanchaDto) { /*<- no funciona */
        const id = await this.setNewId();

        const { nombre } = tipoCancha;
        const newTipoCancha = { id, nombre };
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: CONTENT_TYPE_APPLICATION_JSON,
            body: JSON.stringify(newTipoCancha),
        });
        const parsed = res.json();
        // if (Object.keys(parsed).length) return parsed;
        // throw new NotFoundException(`Tipo de Cancha con id ${id} no existe.`)
        return parsed;
    }
    private async setNewId(): Promise<number> {
        const tiposCancha: TipoCancha[] = await this.getTiposCancha();
        const lastTipoCancha: TipoCancha = tiposCancha.pop();
        const id = lastTipoCancha.id + 1;
        return id;
    }

    async deleteTiposCanchaById(id: number): Promise<any> {
        const res = await fetch(BASE_URL + id, {
            method: 'DELETE',
        });
        const parsed = await res.json();
        return parsed;
    }

    async replaceTiposCanchaByid(id: number, tipoCanchaDto: TipoCanchaDto): Promise<void> {
        const isTipoCancha = await this.getTiposCanchaById(id);
        if (!Object.keys(isTipoCancha).length)
            throw new NotFoundException(
                `Imposible editar. El tipo de Cancha con id ${id} no existe.`,
            );
        const { nombre } = tipoCanchaDto;
        const updateTipoCancha = { id, nombre };
        // console.log('updateTipoCancha', updateTipoCancha);
        const res = await fetch(BASE_URL + id, {
            method: 'PUT',
            headers: CONTENT_TYPE_APPLICATION_JSON,
            body: JSON.stringify(updateTipoCancha),
        });
        const parsed = await res.json();
        return parsed;
    }
}