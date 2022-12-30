import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environments';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular_Project';


  constructor(httpClient: HttpClient){
    //Devo fare una get verso il servizio di backend
    httpClient.get(environment.baseUrl + '/feed').subscribe((dataFromBackend) =>{
      console.log("dati: ", dataFromBackend)
    })
  }

}
