import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Animal } from './animal';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {


  nome: any;

  testDatas : any;

  animals : Animal[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getPrincipalData();
  }

  getPrincipalData() {
    this.httpClient
      .get(environment.baseUrl + '/contact')
      .subscribe((dataFromBackend) => {
        console.log('dati: ', dataFromBackend);
        this.getArrayCard();
      });
  }

  getArrayCard() {this.httpClient.get(environment.baseUrl + '/arrayAnimal').subscribe((dataFromBackend) => {
        console.log('Animali : ', dataFromBackend);
        this.testDatas = dataFromBackend; 
        this.animals = this.testDatas; 
      });
  }

  getTodos() {
    this.httpClient.get(environment.baseUrl + '/arrayAnimal');
  }
}
