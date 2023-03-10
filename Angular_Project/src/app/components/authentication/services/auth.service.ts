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


  constructor(private http: HttpClient, private router: Router) { }

  //Method for save the token in localStorage when user is logged.
  saveToken(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log("Access Token : " + accessToken + "\nRefreshToken : " + refreshToken);
  }

  //Method for request new tokens for User when the tokens are expired.
  refreshTokenUser() {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log("Sono dentro al metodo refresh, con token :" + refreshToken);
    return this.http.post(`${environment.baseUrl}/user/refreshToken`, { refreshToken });
  }

  //Method for request new tokens for Employee when the tokens are expired.
  refreshTokenEmployee() {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log("Sono dentro al metodo refresh, con token :" + refreshToken);
    return this.http.post(`${environment.baseUrl}/employee/refreshToken`, { refreshToken });
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
}
