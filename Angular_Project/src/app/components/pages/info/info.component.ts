import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }


  ngOnInit(){
    const map = L.map('map').setView([43.6168, 13.5189], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    const marker = L.marker([43.6168, 13.5189]).addTo(map);
   }

}

/**
ESEMPI PRECEDENTI: 

IMPORT NECESSARI : 
import { environment } from 'src/environments/environments';

VARIABILI PER LE PROVE : 
nome : any;

METODI : 
//Metodo onInit caricato quando il componente viene avviato. 
ngOnInit(): void {
  this.getPrincipalData();
}
//Metodo che prende i dati dal Backend tramite la get ad una particolare rotta.
  getPrincipalData(){
  this.httpClient.get(environment.baseUrl + '/info').subscribe((dataFromBackend) =>{
    this.nome = dataFromBackend;
    console.log("dati: ", dataFromBackend)
  })
}
 */


