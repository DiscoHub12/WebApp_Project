import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/Models/card';
import { Employee } from 'src/app/Models/employee';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  userType : User | Employee | undefined; 

  clientiCards: Card[] | undefined;
  
  data: any;

  showCard = false;

  isVisible = false;



  clientiCarte = [
    {
      codice: 123, 
      punti : 2
    },
    {
      codice: 456, 
      punti : 3
    },
    {
      codice: 789, 
      punti : 4
    },
    {
      codice: 123, 
      punti : 2
    },
    {
      codice: 123, 
      punti : 2
    },
    {
      codice: 123, 
      punti : 2
    },
  ];


  constructor(
    private httpClient: HttpClient,
    private userService: UserService
    
  ) { 
  }

  ngOnInit(): void {
    this.userType = new Employee(12, "ciao", "ciao", 1);
    if(this.userType instanceof Employee ) {
      this.isVisible = true; 
      //this.getCardsUser();
  }else {
    this.isVisible = false; 
  }
}


  //Get all Cards about User
  getCardsUser() {
    this.showCard == true;
    this.httpClient.get<any>(`${environment.baseUrl}/card/findAll`).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          this.clientiCards = this.data.data;
          console.log(this.clientiCards);

        } else {
          alert("error");
        }
      }, err => {
        alert("Something went wrong");
      });
  }


  setShowCard() {
    if (this.showCard == true) {
      this.showCard = false;
    } else {
      this.showCard = true;
    }
  }


  addClient(){}

  searchClient() {}; 

  addPoints(){};

  createNewUser(){}
}


