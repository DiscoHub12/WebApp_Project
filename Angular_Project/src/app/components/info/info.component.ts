import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  nome : any; 

  constructor(private httpClient: HttpClient){}


  ngOnInit(): void {
    this.getPrincipalData();
  }

  getPrincipalData(){
    this.httpClient.get(environment.baseUrl + '/info').subscribe((dataFromBackend) =>{
      this.nome = dataFromBackend;
      console.log("dati: ", dataFromBackend)
    })
  }

}
