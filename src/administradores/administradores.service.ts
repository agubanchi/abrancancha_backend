import { Injectable, NotFoundException } from '@nestjs/common';
import { AdministradorDto } from 'src/administrador/administrador.dto';
import { Administrador } from 'src/administrador/administrador.interface';
const BASE_URL = 'http://localhost:3030/administradores/';
export const CONTENT_TYPE_APPLICATION_JSON = {
    'Content-Type': 'application/json',
};

@Injectable()
export class AdministradoresService {
    async getAdministradores(): Promise<Administrador[]> {
        const res = await fetch(BASE_URL);
        const parsed = await res.json();
        return parsed;
    }

    async getAdministradoresById(id: number): Promise<Administrador[]> {
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json();
        if (Object.keys(parsed).length) return parsed;
        throw new NotFoundException(`Jugador con id ${id} no existe.`)
    }

    async createAdministrador(administrador: AdministradorDto) { /*<- no funciona */
        const id = await this.setNewId();

        const { idUsuario, idClub } = administrador;
        const newAdministrador = { id, idUsuario, idClub };
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: CONTENT_TYPE_APPLICATION_JSON,
            body: JSON.stringify(newAdministrador),
        });
        const parsed = res.json();
        // if (Object.keys(parsed).length) return parsed;
        // throw new NotFoundException(`Jugador con id ${id} no existe.`)
        return parsed;
    }

    private async setNewId(): Promise<number> {
        const administradores: Administrador[] = await this.getAdministradores();
        const lastAdministrador: Administrador = administradores.pop();
        const id = lastAdministrador.id + 1;
        return id;
    }

    async deleteAdministradoresById(id: number): Promise<any> {
        const res = await fetch(BASE_URL + id, {
            method: 'DELETE',
        });
        const parsed = await res.json();
        return parsed;
    }

    async replaceAdministradoresByid(id: number, administradorDto: AdministradorDto): Promise<void> {
        const isAdministrador = await this.getAdministradoresById(id);
        if (!Object.keys(isAdministrador).length)
            throw new NotFoundException(
                `Imposible editar. El Administrador con N° ${id} no existe.`,
            );
        const { idUsuario, idClub } = administradorDto;
        const updateAdministrador = { id, idUsuario, idClub };
        // console.log('updateAdministrador', updateAdministrador);
        const res = await fetch(BASE_URL + id, {
            method: 'PUT',
            headers: CONTENT_TYPE_APPLICATION_JSON,
            body: JSON.stringify(updateAdministrador),
        });
        const parsed = await res.json();
        return parsed;
    }
}
