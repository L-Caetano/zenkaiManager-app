import { PlayerEntity } from "./player";
export interface MatchEntity {
  id: number;

  playerA: PlayerEntity;
  playerB: PlayerEntity;

  scoreA: number;
  scoreB: number;

  finished: boolean;
  createdAt: Date;
}

