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

  //Variables to assign the User logged.
  userType: User | Employee | undefined;

  //Variables to assign the all Cards of User.
  clientiCards: Card[] | undefined;

  //Variables to assign the response from the request about all Cards User.
  data: any;

  //Variables to assign the response from the request about the Card User.
  card: Card | undefined;

  showCard = false;

  isVisible = false;

  //Variables for the form of add Card.
  showFormAddCard = false; 

  //Variables for the form to search card. 
  showFormSearchCard = false;

  //Variables for the Form to add points into card. 
  showFormAddPoints = false;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService

  ) {
  }

  ngOnInit(): void {
    this.userType = new Employee(12, "Employ", "Employ", 2);
    if (this.userType instanceof Employee) {
      this.isVisible = true;
      this.getAllCards();
    } else{
      this.isVisible = false;
      this.getCardUser();
    }
  }


  //------EMPLOYEE METHODS------

  /**
   * Method to get all the cards of the User.
   */
  getAllCards() {
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

  submitFormAddCard(){}

  addCard(){}


  //-------USER METHODS-----------

  getCardUser() {
    this.httpClient.get<any>(`${environment.baseUrl}/card/findAll`).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          this.card = this.data.data; 
          console.log(this.clientiCards);
        } else {
          alert("error");
        }
      }, err => {
        alert("Something went wrong");
      }
    );
  }
}


