/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerDto } from 'src/player/player.dto';
import { Player } from 'src/player/player.interface';
const BASE_URL = 'http://localhost:3030/padelplayers/';
export const CONTENT_TYPE_APPLICATION_JSON = {
  'Content-Type': 'application/json',
};

@Injectable()
export class PlayersService {
  async getPlayerByName(playerSearch: string): Promise<Player[]> {
    if (playerSearch.trim() === "") return

    const allPlayers = await this.getPlayers();
    //---------------------------------------------------------------------------
    const searchWords: string[] = playerSearch.trim().toUpperCase().split(" ");
    const matchAll = (texto: string) => searchWords.every(word => texto.includes(word));
    const playersFiltered = allPlayers.filter(
      player => matchAll(player.nombre.toUpperCase() + " " + player.apellido.toUpperCase()));
    //---------------------------------------------------------------------------
    // existen players: los retornamos al controller
    if (playersFiltered.length) return playersFiltered;
    throw new NotFoundException(`No existen jugadores con ese nombre.`);
  }

  async getPlayers(): Promise<Player[]> {
    const res = await fetch(BASE_URL);
    const parsed = await res.json();
    return parsed;
  }
  async getPlayersById(id: number): Promise<Player[]> {
    const res = await fetch(BASE_URL + id);
    const parsed = await res.json();
    if (Object.keys(parsed).length) return parsed;
    throw new NotFoundException(`Jugador con id ${id} no existe.`)
  }
  // async setNewPlayer(player: Player) {  /* <-- sugerencia de nombre alternativo.---- */
  async createPlayer(player: PlayerDto) { /*<- no funciona */
    const id = await this.setNewId();
    // const avatar = `https://i.pravatar.cc/200?img=${id}`; //<-esta pagina solo soporta 70 como maximo id.--------
    const avatar = `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${id}.jpg`;
    const { apellido, nombre, email, telefono, categoria } = player;
    const newPlayer = { id, apellido, nombre, email, telefono, categoria, avatar };
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: CONTENT_TYPE_APPLICATION_JSON,
      body: JSON.stringify(newPlayer),
    });
    const parsed = res.json();
    // if (Object.keys(parsed).length) return parsed;
    // throw new NotFoundException(`Jugador con id ${id} no existe.`)
    return parsed;
  }
  private async setNewId(): Promise<number> {
    const players: Player[] = await this.getPlayers();
    const lastPlayer: Player = players.pop();
    const id = lastPlayer.id + 1;
    return id;
  }

  async deletePlayersById(id: number): Promise<any> {
    const res = await fetch(BASE_URL + id, {
      method: 'DELETE',
    });
    const parsed = await res.json();
    return parsed;
  }

  async replacePlayersByid(id: number, playerDto: PlayerDto): Promise<void> {
    const isPlayer = await this.getPlayersById(id);
    if (!Object.keys(isPlayer).length)
      throw new NotFoundException(
        `Imposible editar. El jugador con id ${id} no existe.`,
      );
    const { apellido, nombre, email, telefono, categoria } = playerDto;
    const updatePlayer = { id, apellido, nombre, email, telefono, categoria };
    console.log('updatePlayer', updatePlayer);
    const res = await fetch(BASE_URL + id, {
      method: 'PUT',
      headers: CONTENT_TYPE_APPLICATION_JSON,
      body: JSON.stringify(updatePlayer),
    });
    const parsed = await res.json();
    return parsed;
  }

  // async updatePlayersById(id: number, playerDto: PlayerDto): Promise<void> {
  //   const isPlayer = await this.getPlayersById(id);
  //   if (!Object.keys(isPlayer).length)
  //     throw new NotFoundException(
  //       `Imposible editar. El jugador con id ${id} no existe.`,
  //     );
  //   const updatePlayer = { ...playerDto, id };
  //   console.log('updatePlayer', updatePlayer);
  //   const res = await fetch(BASE_URL + id, {
  //     method: 'PATCH',
  //     headers: CONTENT_TYPE_APPLICATION_JSON,
  //     body: JSON.stringify(updatePlayer),
  //   });
  //   const parsed = await res.json();
  //   return parsed;
  // }
}
