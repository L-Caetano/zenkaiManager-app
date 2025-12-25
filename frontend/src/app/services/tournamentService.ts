import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  getTournamentSettings(id: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(`${this.apiUrl}/tournaments/${id}/settings`)
        .subscribe(resolve, reject);
    });
  }
  updateTournament(id: number, name: string, timer: number, rodadas: number, playOff: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .patch<any>(`${this.apiUrl}/tournaments/${id}/settings`, { name, timer, rodadas, playOff })
        .subscribe(resolve, reject);
    });
  }
  createTournament(name: string, timer: number, rodadas: number, playOff: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(`${this.apiUrl}/tournaments`, { name, timer, rodadas, playOff })
        .subscribe(resolve, reject);
    });
  }
  addNewPlayerToTournament(name: string, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(`${this.apiUrl}/tournaments/${id}/addPlayerToTournament`, { name })
        .subscribe(resolve, reject);
    });
  }
  getPlayersFromTournament(id: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(`${this.apiUrl}/tournaments/${id}/players`)
        .subscribe(resolve, reject);
    });
  }


  removePlayer(playerId: number, tournamentId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .delete<any>(
          `${this.apiUrl}/tournaments/${tournamentId}/players`,
          {
            body: [playerId], // 👈 sempre array (igual ao backend)
          }
        )
        .subscribe(resolve, reject);
    });
  }
  startTournament(id: number) {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(`${this.apiUrl}/tournaments/${id}/startTournament`, {})
        .subscribe(resolve, reject);
    });

  }
}

