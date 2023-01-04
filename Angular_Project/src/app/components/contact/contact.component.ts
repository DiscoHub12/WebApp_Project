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
   descriptionAnimal : any;
   fileJson : any; 
   arrayAnimali : {id:String, nome:String, colore:String, descrizione:String} [] = []; 

  constructor(private httpClient: HttpClient){
    //Devo fare una get verso il servizio di backend
    this.httpClient.get(environment.baseUrl + '/contact').subscribe((dataFromBackend) =>{
      console.log("dati: ", dataFromBackend)
      this.getArrayCard(); 
      //this.getNameAnimal();
      //this.getDescriptionAnimal();
    })
  }

  getNameAnimal(){
    this.httpClient.get(environment.baseUrl + '/nomeAnimale').subscribe((dataFromBackend) =>{
      this.nome = dataFromBackend;
      console.log("nome animale : ", dataFromBackend);
    })
  }
  getDescriptionAnimal(){
    this.httpClient.get(environment.baseUrl + '/descriptionAnimal').subscribe((dataFromBackend) =>{
      this.descriptionAnimal = dataFromBackend; 
      console.log("descrizione animale : ", dataFromBackend);
    })
  }

  getArrayCard(){
    this.httpClient.get(environment.baseUrl + '/arrayAnimal').subscribe((dataFromBackend) => {
      console.log("Animali : ", dataFromBackend);
      this.fileJson = dataFromBackend; 
      this.arrayAnimali = this.fileJson; 
    })
  }
}
