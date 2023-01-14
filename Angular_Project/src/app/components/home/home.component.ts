import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Animal } from '../Models/animal';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nome : any; 

  animals : Animal[] = [];

  prova : any;

  constructor(private httpClient: HttpClient){}


  ngOnInit(): void {
    this.getPrincipalData();
  }

  getPrincipalData(){
    this.httpClient.get(environment.baseUrl + '/home').subscribe((dataFromBackend) =>{
      this.nome = dataFromBackend;
      console.log("dati: ", dataFromBackend)
    })
  }

  inviaAnimali(){
    this.httpClient.get(environment.baseUrl + '/arrayAnimalis').subscribe((dataFromBackend) => {
      this.prova = dataFromBackend; 
      this.animals = this.prova; 
    });
  }

}
