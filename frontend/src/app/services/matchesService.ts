import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getTournamentMatches(tournamentId: number): Observable<Match[]> {
    return this.http.get<Match[]>(
      `${this.apiUrl}/tournaments/${tournamentId}/matches`
    );
  }

  finishMatch(matchId: number, scoreA: number, scoreB: number) {
    return this.http.patch(
      `${this.apiUrl}/matches/${matchId}/result`,
      { scoreA, scoreB }
    );
  }
}

