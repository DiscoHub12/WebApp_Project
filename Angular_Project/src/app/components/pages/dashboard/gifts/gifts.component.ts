import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/Models/card';
import { Employee } from 'src/app/Models/employee';
import { Gift } from 'src/app/Models/gift';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent implements OnInit {

  //This is the variable for the FormGroup.
  form !: FormGroup;

  //This is the variable for associated the User access account. (User or Employee).
  userType: User | Employee | undefined;

  //This is the variable, that indicates if the User is User or Employee, for determinate the div page. 
  isEmployee: boolean | undefined;

  //This is a variable, to associate all Http response.
  data: any;

  //VARIABLES FOR EMPLOYEE
  allGifts: Gift[] = [];

  //Boolean variables to indicate if the Employee want to see all Gifts created.
  showAllGifts = false;

  //Boolean variables to indicate if the Employee want to create a new Gift
  addNewGift = false;



  //VARIABLES FOR USER 
  allMyGifts: Gift[] = [];

  myCard : Card | undefined | any; 

  hasCard = false; 

  showMyReward = false;

  showGiftsForUser = false;




  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForms();
    //this.userType = this.userService.getUser();
    this.userType = new User(1, "Alessio", "Giacche");
    /**
     if (this.userType instanceof Employee) {
      this.isEmployee = true;
      this.getAllGifts();
    }else
     */
     if (this.userType instanceof User) {
      this.isEmployee = false;
      this.getAllGiftsUser();
      this.getCardUser();
      this.getAllGifts();
      console.log("User id : " + this.userType.getId()); 
    }

  }

  initForms() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      punti: ['', Validators.required],
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

  //-----EMPLOYEE METHODS------

  getAllGifts() {
    this.httpClient.get<any>(`${environment.baseUrl}/gifts/findAll`).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          this.allGifts = this.data.data;
          console.log("Tutti i Premi : " + this.allGifts); 
        } else console.log("error");
      }, err => {
        alert("Something went wrong");
      });
    this.resetData();
    this.resetForm();
  }

  createGifts() {
    const nomePremio = this.form.value.nome;
    const punti = this.form.value.punti;

    this.httpClient.post(`${environment.baseUrl}/gifts/create`, { nome: nomePremio, punti: punti }).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("Gifts created successfully");
          this.resetData();
          this.resetForm();
          this.addNewGift = false;
        }
      }, err => {
        console.log("Error");
      });
    this.resetData();
    this.resetForm();
    this.addNewGift = false;

  }

  removeGifts() { }

  findGift() { }

  annullaCreazione() {
    this.resetForm();
  }

  ricaricaPagina() {
    this.getAllGifts();
  }



  //-----USER METHODS------

  getAllGiftsUser() {
    this.httpClient.get<any>(`${environment.baseUrl}/gifts/findAllUser/${this.userType?.getId()}`).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201 || this.data.status == 201) {
          this.allMyGifts = this.data.data;
        }
      }, err => {
        console.log("Something went wrong");
      });
      this.resetData(); 
      this.resetForm();
  }

  getCardUser(){
    this.httpClient.get<any>(`${environment.baseUrl}/card/findCardUser/${this.userType?.getId()}`).subscribe(
      response =>{
        this.data = response; 
        if(this.data.status == 201){
          this.myCard = this.data.data; 
          this.hasCard = true; 
        }
      }, err => {
        console.log("Something went wrong"); 
      }); 
      this.resetData(); 
      this.resetForm();
  }

  retreiveGift(id : Number) {
    for(let gift of this.allGifts){
      if(gift.punti > this.myCard.punti){
        alert(`Numero Punti non sufficenti`); 
        return; 
      }else {
        this.httpClient.post<any>(`${environment.baseUrl}/gifts/addReward`, {idUser : this.userType?.getId, idGift : id}).subscribe(
          response => {
            this.data = response; 
            if(this.data.status == 201){
              alert("Premio riscattato con successo. Ricarica la pagina per vederlo."); 
            }
          }, err=> {
              console.log("Something went wrong");
          }
        );
      }
    }
  }
}
