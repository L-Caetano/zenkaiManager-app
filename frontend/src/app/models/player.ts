export class Player {
  name: string;
  pts: number;
  playedAgainst: Set<string>;

  constructor(name: string) {
    this.name = name;
    this.pts = 0;
    this.playedAgainst = new Set();
  }

  addPoints(points: number): void {
    this.pts += points;
  }

  registerMatch(opponent: Player): void {
    this.playedAgainst.add(opponent.name);
  }

  hasPlayedAgainst(opponent: Player): boolean {
    return this.playedAgainst.has(opponent.name);
  }
}
