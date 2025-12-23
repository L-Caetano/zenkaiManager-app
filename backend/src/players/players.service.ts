import { Injectable } from '@nestjs/common';
import { Player } from './player.model';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class PlayersService {
  private players: Player[] = [];
  constructor(private prisma: PrismaService) {}

  async getRanking() {
    return this.prisma.player.findMany({
      orderBy: [{ pts: 'desc' }, { name: 'asc' }],
    });
  }

  async create(name: string) {
    return this.prisma.player.create({
      data: { name },
    });
  }
}
