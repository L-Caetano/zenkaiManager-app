
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match, MatchesService } from '../../../services/matchesService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  imports: [CommonModule, IonicModule]
})
export class MatchesComponent implements OnInit {
  tournamentId!: number;
  matches: Match[] = [];

  constructor(
    private route: ActivatedRoute,
    private matchesService: MatchesService
  ) { }

  ngOnInit() {
    this.tournamentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMatches();
  }
  reportarResultado() {
  }

  loadMatches() {
    this.matchesService
      .getTournamentMatches(this.tournamentId)
      .subscribe((data) => (this.matches = data));
  }

  finishMatch(match: Match) {
    if (match.scoreA == null || match.scoreB == null) return;

    this.matchesService
      .finishMatch(match.id, match.scoreA, match.scoreB)
      .subscribe(() => this.loadMatches());
  }
}
