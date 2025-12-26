import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Match {
  id: number;
  finished: boolean;
  scoreA: number | null;
  scoreB: number | null;
  playerA: { id: number; name: string };
  playerB: { id: number; name: string };
}

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTournamentMatches(tournamentId: number): Promise<Match[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Match[]>(`${this.apiUrl}/tournaments/${tournamentId}/matches`).subscribe(resolve, reject);

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

