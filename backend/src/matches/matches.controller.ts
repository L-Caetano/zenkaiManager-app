import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private service: MatchesService) {}

  @Get()
  findByTournament(@Query('tournamentId') tournamentId: string) {
    return this.service.findByTournament(tournamentId);
  }

  @Patch(':id/result')
  finishMatch(
    @Param('id') id: string,
    @Body() body: { scoreA: number; scoreB: number },
  ) {
    return this.service.finishMatch(+id, body.scoreA, body.scoreB);
  }
}
