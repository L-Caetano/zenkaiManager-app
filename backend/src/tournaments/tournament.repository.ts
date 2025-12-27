import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTournamentSettingsDto } from 'DTOs/update-tournament-settings.dto';
@Injectable()
export class TournamentsRepository {
  constructor(private prisma: PrismaService) {}

  getAllTournamentsSettings() {
    return this.prisma.tournament.findMany({
      where: { finished: false },
      select: {
        id: true,
        name: true,
        rodadas: true,
        playOff: true,
        timer: true,
      },
    });
  }

  getTournamentAndCurrentRound(id: number) {
    return this.prisma.tournament.findUnique({
      where: { id: id },
      include: {
        players: {
          orderBy: {
            pts: 'desc',
          },
        },
        rounds: {
          orderBy: {
            number: 'desc', // rodada mais recente primeiro
          },
          take: 1, // rodada atual
          include: {
            matches: {
              include: {
                playerA: true,
                playerB: true,
              },
            },
          },
        },
      },
    });
  }
  getTournamentAndAllRounds(id: number) {
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
  getTournamentSetting(id: number) {
    return this.prisma.tournament.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        rodadas: true,
        playOff: true,
        timer: true,
      },
    });
  }
  updateTournamentSettings(id: number, data: UpdateTournamentSettingsDto) {
    return this.prisma.tournament.update({
      where: { id: id },
      data,
      select: {
        id: true,
        name: true,
        rodadas: true,
        playOff: true,
        timer: true,
      },
    });
  }
}
