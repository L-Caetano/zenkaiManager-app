import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoundService {
  constructor(private prisma: PrismaService) { }

  async createNewRound(tournamentId: number) {

    const round = await this.prisma.round.create({
      data: {
        number: 1,
        tournamentId: tournamentId,
      },
    });
    return round
  }
}
