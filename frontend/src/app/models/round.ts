
import { MatchEntity } from "./match";
export interface RoundEntity {
  id: number;
  number: number;        // rodada 1,2,3...
  finished: boolean;
  createdAt: Date;

  matches?: MatchEntity[];
}
