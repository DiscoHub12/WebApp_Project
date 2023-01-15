import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void { }

}

/**
 
ESEMPI PRECEDENTI :


IMPORT NECESSARI : 
import { environment } from 'src/environments/environments';
import { Animal } from '../Models/animal';  


VARIABILI PER LE PROVE :
  nome : any; 

  animals : Animal[] = [];

  prova : any;


METODI : 
 //Metodo onInit caricato quando il componente viene avviato. 
 ngOnInit(): void {
  this.getPrincipalData();
}

//Metodo che prende i dati dal Backend tramite la get ad una particolare rotta.
getPrincipalData(){
  this.httpClient.get(environment.baseUrl + '/home').subscribe((dataFromBackend) =>{
    this.nome = dataFromBackend;
    console.log("dati: ", dataFromBackend)
  })
}

//Metodo che prende i dati dal Backend tramite la get ad una particolare rotta.
inviaAnimali(){
  this.httpClient.get(environment.baseUrl + '/arrayAnimalis').subscribe((dataFromBackend) => {
    this.prova = dataFromBackend; 
    this.animals = this.prova; 
  });
}
*/

