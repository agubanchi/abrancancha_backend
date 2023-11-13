/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioDto } from 'src/usuario/usuario.dto';
import { Usuario } from 'src/usuario/usuario.interface';
const BASE_URL = 'http://localhost:3030/padelusuarios/';
export const CONTENT_TYPE_APPLICATION_JSON = {
    'Content-Type': 'application/json',
};

@Injectable()
export class UsuariosService {
    async getUsuarioByName(usuarioSearch: string): Promise<Usuario[]> {
        if (usuarioSearch.trim() === "") return

        const allUsuarios = await this.getUsuarios();
        //---------------------------------------------------------------------------
        const searchWords: string[] = usuarioSearch.trim().toUpperCase().split(" ");
        const matchAll = (texto: string) => searchWords.every(word => texto.includes(word));
        const usuariosFiltered = allUsuarios.filter(
            usuario => matchAll(usuario.nombre.toUpperCase()));
        //---------------------------------------------------------------------------
        // existen usuarios: los retornamos al controller
        if (usuariosFiltered.length) return usuariosFiltered;
        throw new NotFoundException(`No existen usuarios con ese nombre.`);
    }

    async getUsuarios(): Promise<Usuario[]> {
        const res = await fetch(BASE_URL);
        const parsed = await res.json();
        return parsed;
    }
    async getUsuariosById(id: number): Promise<Usuario[]> {
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json();
        if (Object.keys(parsed).length) return parsed;
        throw new NotFoundException(`Jugador con id ${id} no existe.`)
    }
    // async setNewUsuario(usuario: Usuario) {  /* <-- sugerencia de nombre alternativo.---- */
    async createUsuario(usuario: UsuarioDto) { /*<- no funciona */
        const id = await this.setNewId();

        const { nombre, password, email, telefono, estado } = usuario;
        const newUsuario = { id, nombre, password, email, telefono, estado };
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: CONTENT_TYPE_APPLICATION_JSON,
            body: JSON.stringify(newUsuario),
        });
        const parsed = res.json();
        // if (Object.keys(parsed).length) return parsed;
        // throw new NotFoundException(`Jugador con id ${id} no existe.`)
        return parsed;
    }
    private async setNewId(): Promise<number> {
        const usuarios: Usuario[] = await this.getUsuarios();
        const lastUsuario: Usuario = usuarios.pop();
        const id = lastUsuario.id + 1;
        return id;
    }

    async deleteUsuariosById(id: number): Promise<any> {
        const res = await fetch(BASE_URL + id, {
            method: 'DELETE',
        });
        const parsed = await res.json();
        return parsed;
    }

    async replaceUsuariosByid(id: number, usuarioDto: UsuarioDto): Promise<void> {
        const isUsuario = await this.getUsuariosById(id);
        if (!Object.keys(isUsuario).length)
            throw new NotFoundException(
                `Imposible editar. El usuario con id ${id} no existe.`,
            );
        const { nombre, password, email, telefono, estado } = usuarioDto;
        const updateUsuario = { id, nombre, password, email, telefono, estado };
        // console.log('updateUsuario', updateUsuario);
        const res = await fetch(BASE_URL + id, {
            method: 'PUT',
            headers: CONTENT_TYPE_APPLICATION_JSON,
            body: JSON.stringify(updateUsuario),
        });
        const parsed = await res.json();
        return parsed;
    }
}
