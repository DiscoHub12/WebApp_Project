import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {


  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  /**
 
ESEMPI PRECEDENTI :


IMPORT NECESSARI : 
import { environment } from 'src/environments/environments';
import { Animal } from '../Models/animal';  


VARIABILI PER LE PROVE :
  nome: any;

  testDatas : any;

  animals : Animal[] = [];


METODI : 
 //Metodo onInit caricato quando il componente viene avviato. 
 ngOnInit(): void {
    this.getPrincipalData();
  }

//Metodo che prende i dati dal Backend tramite la get ad una particolare rotta.
getPrincipalData() {
    this.httpClient.get(environment.baseUrl + '/contact').subscribe((dataFromBackend) => {
        console.log('dati: ', dataFromBackend);
        this.getArrayCard();
      });
  }

  //Metodo che prende i dati dal Backend tramite la get ad una particolare rotta.
  getArrayCard() {this.httpClient.get(environment.baseUrl + '/arrayAnimal').subscribe((dataFromBackend) => {
        console.log('Animali : ', dataFromBackend);
        this.testDatas = dataFromBackend; 
        this.animals = this.testDatas; 
      });
  }

  //Metodo che prende i dati dal Backend tramite la get ad una particolare rotta.
  getTodos() {
    this.httpClient.get(environment.baseUrl + '/arrayAnimal');
  }
*/


}
