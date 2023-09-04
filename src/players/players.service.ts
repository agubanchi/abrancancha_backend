import { Injectable } from '@nestjs/common';
import { Players } from './players.interface';
const BASE_URL = 'http://localhost:3030/padelplayers';

@Injectable()
export class PlayersService {
  async getPlayers(): Promise<Players[]> {
    const res = await fetch(BASE_URL);
    const parsed = await res.json();
    return parsed;
  }

  async getPlayersById(id: number): Promise<Players[]> {
    const res = await fetch(BASE_URL + id);
    const parsed = await res.json();
    return parsed;
  }

  async createPlayer(players: Players) {
    const id = await this.setId();
    const newPlayer = {
      ...players,
      id,
    };
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer),
    });
    const parsed = res.json();
    return parsed;
  }

  private async setId(): Promise<number> {
    const players = await this.getPlayers();
    const id = players.pop().id + 1;
    return id;
  }
}
