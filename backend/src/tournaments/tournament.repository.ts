import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TournamentsRepository {

  constructor(private prisma: PrismaService) { }

  getTournamentWithCurrentRound(id: number) {
    return this.prisma.tournament.findUnique({
      where: { id: id },
      include: {
        players: {
          orderBy: { pts: 'desc' },
        },
        rounds: {
          include: {
            matches: true,
          },
        },
      },
    });


  }

}
