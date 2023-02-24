import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { Treatments } from 'src/app/Models/treatments';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss']
})
export class TreatmentsComponent implements OnInit {

  //This is the variable for the FormGroup.
  public form !: FormGroup;


  //This is the variable for associated the User access account. (User or Employee).
  userType : User | Employee | undefined;

  //This is the variable, that indicates if the User is User or Employee, for determinate the div page. 
  isVisible = false;

  //This is a variable, to associate all Http response.
  data: any;



  //-----VARIABLES FOR EMPLOYEE-----

  //Variables that rapresent all Treatments of Users.
  treatments: Treatments[] = [];

  searchedTreatment = false;

  //Variable that rapresent the Treatments searched if exists.
  treatmentCercato: Treatments[] = [];

  showFormAddTreatment = false;

  showFormSearchTreatment = false;

  idUtenteCercato!: Number;



  //-----VARIABLES FOR USER-----

  //Variable that rapresent the User Treatments.
  treatmentsUser: Treatments[] = [];

  searchedTreatmentUser: Treatments[] = [];

  showFormSearchTreatmentUser = false;




  constructor(
    private authUser: UserService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.initForm();
    this.userType = this.authUser.getUser();
    if (this.userType instanceof Employee) {
      this.isVisible = true;
      this.getAllTreatments();
    } else {
      this.isVisible = false;
      this.getTreatmentUser();
    }
  }


  //This is the method for init the FormGroup. 
  initForm() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      nomeTrattamento: ['', Validators.required],
      descrizione: ['', Validators.required],
      data: ['', Validators.required],
    
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

  indietro () {
    this.searchedTreatment = false;
    this.treatmentCercato = [];
    this.resetUtente();
    this.ngOnInit();
  }

  resetUtente(){
    this.idUtenteCercato = 0;
  }



  //-----EMPLOYEE METHODS------

  //This method returns all treatments
  getAllTreatments() {
    this.httpClient.get<any>(`${environment.baseUrl}/treatment/findAll`).subscribe(response => {
      this.data = response;
      if (this.data.status === 201) {
        this.treatments = this.data.data;
        console.log(this.treatments);
      }
      else {
        alert("Error");
      }
    }, err => {
      alert("Something went wrong");

    });
  }

  //This method add a new treatment -- rivedere 
  addTreatment() {
    const name = this.form.value.nomeTrattamento;
    const description = this.form.value.descrizione;
    let date: any;
    let dataDaControllare = new Date(this.form.value.data);
    let dataCorrente = new Date();

    if(dataDaControllare.getTime() > dataCorrente.getTime())
     {
      this.resetForm();
      alert("Data incorrect");
    } else date = this.form.value.data;
    
    this.httpClient.post<any>(`${environment.baseUrl}/treatment/create`, {
      idUtente : this.idUtenteCercato,
      nomeTrattamento: name,
      descrizione: description,
      data: date
    }).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("Trattamento aggiunto con successo");
        }
      });
    this.resetData();
    this.resetForm();
  }


  //This method allows you to search a Treatment
  findTreatment() {
    const nome = this.form.value.nome;
    const cognome = this.form.value.cognome;
    let trattamentoTrovato = false;
    for (let treatment of this.treatments) {
      if (treatment.owner.nome == nome && treatment.owner.cognome == cognome) {
        this.idUtenteCercato = treatment.idUtente;
        this.treatmentCercato.push(treatment);
        this.searchedTreatment = true;
        trattamentoTrovato = true;
      }
    }
    if (!trattamentoTrovato) {
      alert("Nome o cognome errati, reinserirli");
      this.resetForm();
    }
  }
  


  //-----USER METHODS----------

  //This method returns all treatments of a user
  getTreatmentUser() {
    if(this.userType){
    this.httpClient.get<any>(`${environment.baseUrl}/treatment/findOne/${this.userType.id}`).subscribe(
      response => {
        this.data = response;
        if (this.data.status === 201) {
          this.treatmentsUser = this.data.data;
          console.log(this.treatmentsUser);
          this.resetData();
        }
      }, err => {
        alert("Something went wrong");
      });
    }
  }


  searchTreatments(){
    const nomeTrattamento = this.form.value.nome;
    for(let treatment of this.treatmentsUser){
      if(treatment.nomeTrattamento == nomeTrattamento){
        this.searchedTreatmentUser.push(treatment);
        this.searchedTreatment = true;
      }
    }
    this.resetForm();
  }

  //This method close the Search Treatment.
  closeSearchedTreatmentsUser() {
    this.searchedTreatment = false;
    this.searchedTreatmentUser = [];
  }
}
