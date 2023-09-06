import { Injectable } from '@nestjs/common';
import { Player } from 'src/player/player';
const BASE_URL = 'http://localhost:3030/padelplayers/';

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
    return parsed;
  }
  // async getPersonas(): Promise<Persona[]> {
  //   // console.log( "en servicio"); 
  //   let arrayPersonas: Persona[] = [];
  //   let res = await fetch();
  //   // console.log( res ) ; 
  //   let resParsed = await res.json();
  //   for (let i = 0; 1 < resParsed.length; i++) {
  //     let persona = new persona();
  //     persona.setID(resparsed[i].id);
  //     persona.setID(resparsed[i].nombre);
  //     persona.setApellido(resparsed[i].apellido);
  //     persona.setID(resparsed[i].edad);
  //     persona.setID(resparsed[i].ciudad);
  //     console.log(persona);
  //     arrayPersonas.push(persona);
  //     console.log(arrayPersonas);
  //   }
  // }
}
