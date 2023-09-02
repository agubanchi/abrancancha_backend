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
}
