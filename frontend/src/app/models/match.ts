import { Player } from "./player";

export class Match {
    public result = { a : 0, b: 0}
  constructor(
    public a: Player,
    public b: Player
  ) {}
}
