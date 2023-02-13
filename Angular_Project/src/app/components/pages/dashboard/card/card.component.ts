import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/Models/card';
import { Employee } from 'src/app/Models/employee';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';
import { User } from 'src/app/Models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  //This is the variable for the FormGroup.
  form !: FormGroup;

  //This is the variable for associated the User access account. (User or Employee).
  userType !: User | Employee;

  //This is the variable, that indicates if the User is User or Employee, for determinate the div page. 
  isEmployee: boolean | undefined;

  //This is a variable, to associate all Http response.
  data: any;



  //-----VARIABLES FOR EMPLOYEE-----

  //Variables that rapresent all Card of Users.
  allCards: Card[] = [];

  //Variable that indicates if Employee search Card of specific User.
  searchedCard = false;

  //Variable that rapresent the Card searched if exists.
  cardCercata: Card | undefined;

  showFormAddCard = false;

  showFormSearchCard = false;

  showFormAddPoints = false;



  //------VARIABLES FOR USER-------

  //Variable that rapresent the User Card.
  cardUser: Card | undefined;

  //Variable that rapresent if the User have card.
  haveCard = false;



  //Costructor for the CardComponent.
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  //NgOnInit implementation.
  ngOnInit(): void {
    this.initForm();
    this.userType = new User(1, "Alessio", "Ciao");
    if (this.userType instanceof Employee) {
      this.isEmployee = true;
      this.getAllCardUsers();
    } else if (this.userType instanceof User) {
      this.isEmployee = false;
      //this.getCardUser();
    }
  }

  //This is the method for init the FormGroup. 
  initForm() {
    this.form = this.formBuilder.group({
      codice: ['', Validators.required],
      punti: ['', Validators.required],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      nuovoCodice: ['', Validators.required],
    });
  }

  //This is the method for reset the FormGroup value.
  resetForm() {
    this.form.reset();
  }

  //This is the method for reset the Data from backend.
  resetData() {
    this.data = null;
  }

  //This method rebuild the page.
  ricaricaPagina() {
    this.ngOnInit();
  }


  //-----EMPLOYEE METHODS------

  //This method get all Card Users.
  getAllCardUsers() {
    this.httpClient.get<any>(`${environment.baseUrl}/card/findAll`).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          this.allCards = this.data.data;
          console.log(this.allCards);
        }
      }, err => {
        alert("Something went wrong");
      });
    this.resetData();
  }

  //This method allows you to create a new Card.
  createCard() {
    const nome = this.form.value.nome;
    const cognome = this.form.value.cognome;
    const codice = this.form.value.nuovoCodice;
    this.httpClient.post(`${environment.baseUrl}/card/create`, { nome: nome, cognome: cognome, codice: codice }).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("Card created successfully.");
        }
      }, err => {
        this.data = err;
        if (this.data.status == 405) {
          alert("User don't have account");
        } else if (this.data.status == 400) {
          alert("User already have Card.");
        }
      }
    );
    this.resetData();
    this.resetForm();
  }

  //This method allows you to search a Card.
  searchCard() {
    const nome = this.form.value.nome;
    const cognome = this.form.value.cognome;
    for (let card of this.allCards) {
      if (card.owner.nome == nome && card.owner.cognome == cognome) {
        this.cardCercata = card;
        this.searchedCard = true;
      }
    }
    this.resetForm()
  }

  //This method close the Search Card.
  closeSearchedCard() {
    this.searchedCard = false;
    this.cardCercata = undefined;
  }

  //This method allows you to add points into a Card.
  addPointsCard() {
    const codice = this.form.value.codice;
    const punti = this.form.value.punti;
    this.httpClient.post(`${environment.baseUrl}/card/addPoints`, { codice: codice, punti: punti }).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("Points added successfully!");
        } else alert("Error in adding points");
      });
    this.resetData();
    this.resetForm();
  }

  addPointsAll() {
    const punti = this.form.value.punti;
    this.httpClient.post(`${environment.baseUrl}/card/addPointsAll`, { punti: punti }).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("Points added successfully!");
        } else alert("Error in adding points");
      });
    this.resetData();
    this.resetForm();
  }




  //-----USER METHODS----------

  //Method that get the Card for specific User logged.
  getCardUser() {
    this.httpClient.get<any>(`${environment.baseUrl}/card/findCardUser/${this.userType.id}`).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          this.cardUser = this.data.data;
          this.haveCard = true;
          this.resetData();
        }
      }, err => {
        this.data = err;
        if (this.data.status == 404) {
          this.haveCard = false;
        }
      });
  }
}