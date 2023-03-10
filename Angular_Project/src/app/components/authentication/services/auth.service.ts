import { Employee } from "src/app/Models/employee";
import { User } from "src/app/Models/user";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from "src/environments/environments";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  data: any;

  token = localStorage.getItem('accessToken');


  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
  };

  constructor(private http: HttpClient, private router: Router) { }

  //Method for save the token in localStorage when user is logged.
  saveToken(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  //Method for request new tokens for User when the tokens are expired.
  refreshTokenUser() {
    this.http.post(`${environment.baseUrl}/user/refreshToken`, { refreshToken: localStorage.getItem('refreshToken') }).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          this.saveToken(this.data.accessToken, this.data.refreshToken);
          alert("Token aggiornato. Riprovare.");
        }
      }, err => {
        this.data = err;
        if (this.data.status == 401) {
          alert("Sessione scaduta. Rieffettua il Login.");
          this.router.navigate(['']);
        }
      });
  }

  //Method for request new tokens for Employee when the tokens are expired.
  refreshTokenEmployee() {
    this.http.post(`${environment.baseUrl}/employee/refreshToken`, { refreshToken: localStorage.getItem('refreshToken') }).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          this.saveToken(this.data.accessToken, this.data.refreshToken);
          alert("Token aggiornato. Riprovare.");
        }
      }, err => {
        this.data = err;
        if (this.data.status == 401) {
          alert("Sessione scaduta. Rieffettua il Login.");
          this.router.navigate(['']);
        }
      });
  }

  //Verifica se il token JWT è presente nella cache locale del browser. Se il token non esiste 
  //viene reindirizzato alla home, altrimenti torna true indicando che l'utente è autenticato.
  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  resetData() {
    this.data = null;
  }

}
