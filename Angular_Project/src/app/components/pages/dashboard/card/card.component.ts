import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/employee';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  userType = new Employee(12, 'John', "Codice", 1);


  clientCards: any;

  data: any;

  printCard = false; 

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    //this.userType = this.userService.getUser();
  }


  getCardsUser() {
    this.httpClient.get<any>(`${environment.baseUrl}/card/findAll`).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          this.clientCards = JSON.parse(JSON.stringify(this.data.data));
        } else {
          alert("error");
        }
      }, err => {
        alert("Something went wrong");
      });
  }

  checkCards(){
    if(this.printCard == false){

    }else {
      this.getCardsUser();
    }
  }


}

