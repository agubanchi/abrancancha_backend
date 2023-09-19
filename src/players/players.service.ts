/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerDto } from 'src/player/player.dto';
// import { Player } from 'src/player/player';
import { Player } from 'src/player/player.interface';
const BASE_URL = 'http://localhost:3030/padelplayers/';
// const BASE_URL = 'https://647684449233e82dd53a14ea.mockapi.io/players/';
export const CONTENT_TYPE_APPLICATION_JSON = { 'Content-Type': 'application/json' };

@Injectable()
export class PlayersService {
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
    // async createPlayer(player: Player) {
    const id = await this.setNewId();
    // const avatar = `https://i.pravatar.cc/200?img=${id}`; //<-esta pagina solo soporta 70 como maximo id.--------
    const avatar = `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${id}.jpg`;
    const newPlayer = { id, ...player, avatar };

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

  async replacePlayersByid(id: number, body: PlayerDto): Promise<void> {
    const isPlayer = await this.getPlayersById(id);
    if (!Object.keys(isPlayer).length)
      throw new NotFoundException(`Imposible editar. El jugador con id ${id} no existe.`);

    const replacePlayer = { id, ...body };
    console.log('replacePlayer', replacePlayer);
    const res = await fetch(BASE_URL + id, {
      method: 'PUT',
      headers: CONTENT_TYPE_APPLICATION_JSON,
      body: JSON.stringify(replacePlayer),
    });
    const parsed = await res.json();
    return parsed;
  }

  async updatePlayersById(id: number, body: PlayerDto): Promise<void> {
    const isPlayer = await this.getPlayersById(id);
    if (!Object.keys(isPlayer).length)
      throw new NotFoundException(`Imposible editar. El jugador con id ${id} no existe.`);

    const updatePlayer = { id, ...body };
    console.log('updatePlayer', updatePlayer);
    const res = await fetch(BASE_URL + id, {
      method: 'PATCH',
      headers: CONTENT_TYPE_APPLICATION_JSON,
      body: JSON.stringify(updatePlayer),
    });
    const parsed = await res.json();
    return parsed;
  }
}
