
import { PlayerEntity } from "./player";
import { RoundEntity } from "./round";
export interface TournamentEntity {
  id: number;
  name: string;
  createdAt: Date;
  timer: number;        // 0 = tempo livre
  rodadas: number;      // total de rodadas suíças
  playOff?: number;     // top cut (2,4,8...)

  players: PlayerEntity[];
  rounds: RoundEntity[];
}
