import { Component, OnInit } from '@angular/core';
import { TournamentEntity } from 'src/app/models/tournament';
import { TournamentService } from 'src/app/services/tournamentService';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  public tournaments?: TournamentEntity[] = [
  ]
  constructor(private tournamentService: TournamentService) { }
  ngOnInit(): void {
    this.tournamentService.getAllTournaments().then((r: TournamentEntity[]) => {
      this.tournaments = r
    })

  }
}
