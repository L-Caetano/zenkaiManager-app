export class Tournament {
  constructor(
    public id: string,
    public name: string,
    public playerIds: string[] = []
  ) {}
}

