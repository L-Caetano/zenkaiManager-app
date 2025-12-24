import { Controller, Param, Body, Post, Get } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';

@Controller('tournaments')
export class TournamentsController {
  constructor(private service: TournamentsService) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
      timer: number;
      rodadas: number;
      playOff: number;
    },
  ) {
    return this.service.create(
      body.name,
      body.timer,
      body.rodadas,
      body.playOff,
    );
  }
  @Get(':id/settings')
  getSettings(@Param('id') id: string) {
    return this.service.getTournamentSettings(Number(id));
  }
  @Post(':id/generate-matches')
  generateMatches(@Param('id') id: string) {
    return this.service.generateMatches(+id);
  }
  @Get(':id/matches')
  getMatches(@Param('id') id: string) {
    return this.service.getMatches(+id);
  }

  @Get(':id/players')
  getPlayers(@Param('id') id: string) {
    return this.service.getPlayers(+id);
  }

  @Post(':id/players')
  addPlayers(@Param('id') id: string, @Body() body: { playerIds: number[] }) {
    return this.service.addPlayers(Number(id), body.playerIds);
  }
  @Post(':id/addPlayerToTournament')
  addPlayerToTournament(@Param('id') id: string, @Body('name') name: string) {
    return this.service.createPlayerAndAddToTournament(Number(id), name);
  }
}
