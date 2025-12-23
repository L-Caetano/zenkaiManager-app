export class Match {
  constructor(
    public id: string,
    public tournamentId: string,
    public playerA: string,
    public playerB: string,
    public scoreA: number = 0,
    public scoreB: number = 0,
    public winnerId: string | null = null,
    public finished: boolean = false
  ) {}
}

