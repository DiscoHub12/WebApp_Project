import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { JsonPipe } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  nome : any;
  parola = "ciao";

  constructor(private httpClient: HttpClient){}


  ngOnInit(): void {
    this.getPrincipalData();
  }

  getPrincipalData(){
    this.httpClient.get(environment.baseUrl + '/login').subscribe((dataFromBackend) =>{
      this.nome = dataFromBackend;
      console.log("dati: ", dataFromBackend)
    })
  }

  funzioneInvia(){
    this.httpClient.post(environment.baseUrl + '/login', {params : this.parola}).subscribe();
  }
}


