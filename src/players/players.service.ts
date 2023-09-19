/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerDto } from 'src/player/player.dto';
// import { Player } from 'src/player/player';
import { Player } from 'src/player/player.interface';
const BASE_URL = 'http://localhost:3030/padelplayers/';
// const BASE_URL = 'https://647684449233e82dd53a14ea.mockapi.io/players/';

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
    // return parsed;
  }

  // async setNewPlayer(player: Player) {  /* <-- sugerencia de nombre alternativo.---- */
  async createPlayer(player: PlayerDto) { /*<- no funciona */
    // async createPlayer(player: Player) {
    const id = await this.setNewId();
    // const avatar = `https://i.pravatar.cc/200?img=${id}`; //<-esta pagina solo soporta 70 como maximo id.--------
    const avatar = `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${id}.jpg`; //<-esta pagina solo soporta 70 como maximo id.--------
    const newPlayer = { id, ...player, avatar };

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlayer),
    });
    const parsed = res.json();
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
  async updatePlayersById(id: number, body: Player): Promise<void> {
    const isPlayer = await this.getPlayersById(id);
    if (!Object.keys(isPlayer).length) return;
    const updatePlayer = { ...body, id };
    console.log('updatePlayer', updatePlayer);
    const res = await fetch(BASE_URL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePlayer),
    });
    const parsed = await res.json();
    return parsed;
  }
}
