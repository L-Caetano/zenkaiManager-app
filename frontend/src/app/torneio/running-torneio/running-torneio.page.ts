import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { HeaderComponent } from 'src/app/header/header.component';
import { MatchesComponent } from './matches/matches.component';
import { TorneioRankingComponent } from './ranking/torneio-ranking/torneio-ranking.component';
import { TournamentService } from 'src/app/services/tournamentService';

import { Match } from '../../services/matchesService';
@Component({
  selector: 'app-running-torneio',
  templateUrl: './running-torneio.page.html',
  styleUrls: ['./running-torneio.page.scss'],
  standalone: true,
  imports: [CommonModule, TorneioRankingComponent, MatchesComponent, IonicModule, HeaderComponent]

})
export class RunningTorneioPage implements OnInit {
  public rodadas: number = 0;
  public topCut: number = 0;
  public timer: number = 0;
  public name: string = '';
  public matches: Match[] = []
  public players: any;
  public tournamentId: number = 0
  constructor(private activatedRoute: ActivatedRoute, private tournamentService: TournamentService) { }

  ngOnInit() {
    const tournamentId = this.activatedRoute.snapshot.paramMap.get('id')
    this.tournamentService.getTournament(Number(tournamentId)).then((r: any) => {
      console.log('teste', r)
      this.matches = r.rounds[r.rounds.length - 1].matches
      this.tournamentId = r.id
      this.rodadas = r.rodadas;
      this.timer = r.timer
      this.name = r.name
      this.topCut = r.playOff
      this.players = r.players
    })
  }
  gerarNovaRodada() {
    this.tournamentService.gerarRound(this.tournamentId)
  }




}
