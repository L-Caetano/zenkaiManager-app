import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoundRepository {
  constructor(private prisma: PrismaService) {}
  updateFinishRound(id: number) {
    return this.prisma.round.update({
      where: { id: id },
      data: { finished: true },
    });
  }
  createNewRound(nextRoundNumber: number, tournamentId: number) {
    return this.prisma.round.create({
      data: {
        number: nextRoundNumber,
        tournamentId,
      },
    });
  }
}
