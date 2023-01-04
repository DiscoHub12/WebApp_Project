import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

   nome : any;

  constructor(httpClient: HttpClient){
    //Devo fare una get verso il servizio di backend
    httpClient.get(environment.baseUrl + '/contact').subscribe((dataFromBackend) =>{
      this.nome = dataFromBackend;
      console.log("dati: ", dataFromBackend)
    })
  }
}
