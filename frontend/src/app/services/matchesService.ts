import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatchEntity } from '../models/match';


@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTournamentMatches(tournamentId: number): Promise<MatchEntity[]> {
    return new Promise((resolve, reject) => {
      this.http.get<MatchEntity[]>(`${this.apiUrl}/tournaments/${tournamentId}/matches`).subscribe(resolve, reject);

    })
  }

  finishMatch(matchId: number, scoreA: number, scoreB: number) {

    return new Promise((resolve, reject) => {
      this.http.patch(
        `${this.apiUrl}/matches/${matchId}/result`,
        { scoreA, scoreB }
      ).subscribe(resolve, reject)
    })
  }
}

