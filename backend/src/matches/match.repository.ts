import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchRepository {
  constructor(private prisma: PrismaService) {}
  countUnfinishedMatches(roundId: number) {
    return this.prisma.match.count({
      where: {
        roundId: roundId,
        finished: false,
      },
    });
  }
  createManyMatches(matches: Prisma.MatchCreateManyInput[]) {
    return this.prisma.match.createMany({
      data: matches,
    });
  }
}
