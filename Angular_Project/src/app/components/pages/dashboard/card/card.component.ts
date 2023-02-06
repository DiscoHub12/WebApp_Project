import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/Models/card';
import { Employee } from 'src/app/Models/employee';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  userType : any; 

  clientiCards: Card[] | undefined;
  data: any;

  showCard = false;



  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.userType = this.userService.getUser();
    if(this.userType instanceof Employee) {
      this.getCardsUser();
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
}

