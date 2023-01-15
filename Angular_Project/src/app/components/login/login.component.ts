import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private httpClient: HttpClient) { }


  ngOnInit(): void { }

  /**
  ESEMPI PRECEDENTI: 

  IMPORT NECESSARI :
  import { environment } from 'src/environments/environments';
  import { JsonPipe } from '@angular/common';

  VARIABILI PER LE PROVE : 
  nome : any;
  parola = "ciao";

  METODI : 
  //Metodo onInit caricato quando il componente viene avviato. 
  ngOnInit(): void {
    this.getPrincipalData();
  }


  //Metodo che prende i dati dal Backend tramite la get ad una particolare rotta.
    getPrincipalData(){
    this.httpClient.get(environment.baseUrl + '/login').subscribe((dataFromBackend) =>{
      this.nome = dataFromBackend;
      console.log("dati: ", dataFromBackend)
    })
  }

  //Metodo che invia dei dati al Backend tramite la chiamata a funzione post()
  funzioneInvia(){
    this.httpClient.post(environment.baseUrl + '/login', {params : this.parola}).subscribe();
  }
   */


}


