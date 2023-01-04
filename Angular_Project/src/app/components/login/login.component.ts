import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  nome = "Ciao";

  constructor(private httpClient: HttpClient) {
    //Devo fare una get verso il servizio di backend
    httpClient.get(environment.baseUrl + '/login').subscribe((dataFromBackend) => {
      console.log("dati: ", dataFromBackend)
    })
  }

  funzioneInvia() {
    this.httpClient.post(environment.baseUrl + '/login', this.nome).subscribe();
  }
}


