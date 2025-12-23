import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createTournament(name: string, timer: number, rodadas: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(`${this.apiUrl}/tournaments`, { name, timer, rodadas })
        .subscribe(resolve, reject);
    });
  }
}

