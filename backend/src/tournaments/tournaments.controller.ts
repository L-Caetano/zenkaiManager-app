import { Controller, Param, Body, Post, Get } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';

@Controller('tournaments')
export class TournamentsController {
  constructor(private service: TournamentsService) { }

  @Post()
  create(@Body() body: { name: string }) {
    return this.service.create(body.name);
  }

  @Post(':id/generate-matches')
  generateMatches(@Param('id') id: string) {
    return this.service.generateMatches(+id);
  }
  @Get(':id/matches')
  getMatches(@Param('id') id: string) {
    return this.service.getMatches(+id);
  }

  @Post(':id/players')
  addPlayers(@Param('id') id: string, @Body() body: { playerIds: number[] }) {
    return this.service.addPlayers(Number(id), body.playerIds);
  }
}
