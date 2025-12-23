import { Controller, Post, Body, Get } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get('ranking')
  getRanking() {
    return this.playersService.getRanking();
  }
  @Post()
  create(@Body() body: { name: string }) {
    return this.playersService.create(body.name);
  }
}
