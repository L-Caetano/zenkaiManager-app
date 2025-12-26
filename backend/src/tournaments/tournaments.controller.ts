import {
  Controller,
  Delete,
  Param,
  Body,
  Post,
  Patch,
  Get,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';

import { UpdateTournamentSettingsDto } from '../../DTOs/update-tournament-settings.dto';
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
  @Patch(':id/settings')
  updateSettings(
    @Param('id') id: string,
    @Body() body: UpdateTournamentSettingsDto,
  ) {
    return this.service.updateSettings(Number(id), body);
  }
  @Get(':id/settings')
  getSettings(@Param('id') id: string) {
    return this.service.getTournamentSettings(Number(id));
  }
  @Post(':id/generateRound')
  generateMatches(@Param('id') id: string) {
    return this.service.generateSwissRound(+id);
  }
  @Get(':id/matches')
  getMatches(@Param('id') id: string) {
    return this.service.getMatches(+id);
  }

  @Get(':id/players')
  getPlayers(@Param('id') id: string) {
    return this.service.getPlayers(+id);
  }

  @Delete(':id/players')
  removePlayers(@Param('id') id: string, @Body() playerIds: number[]) {
    return this.service.removePlayers(+id, playerIds);
  }
  @Post(':id/players')
  addPlayers(@Param('id') id: string, @Body() body: { playerIds: number[] }) {
    return this.service.addPlayers(Number(id), body.playerIds);
  }
  @Post(':id/addPlayerToTournament')
  addPlayerToTournament(@Param('id') id: string, @Body('name') name: string) {
    return this.service.createPlayerAndAddToTournament(Number(id), name);
  }
  @Get(':id')
  getTournament(@Param('id') id) {
    return this.service.getTournament(+id);
  }
}
