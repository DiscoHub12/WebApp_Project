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
  userType !: User | Employee;

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



  //-----VARIABLES FOR USER-----

  //Variable that rapresent the User Treatments.
  treatmentsUser: Treatments[] = [];



  constructor(
    private authUser: UserService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }


  ngOnInit() {
    this.initForm();
    this.userType = new Employee(2, "Sofia", "Scattolini", 0)
    //this.userType = this.authUser.getUser();
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
      idUser: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      nome: ['', Validators.required],
      cognome: ['', Validators.required]
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
    const name = this.form.value.name;
    const description = this.form.value.description;
    const date = this.form.value.date;
    const nome = this.form.value.nome;
    const cognome = this.form.value.cognome;
    this.httpClient.post<any>(`${environment.baseUrl}/treatment/create`, {
      nome: name,
      descrizione: description,
      data: date
    }).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("Trattamento aggiunto con successo");
        }
      }, err => {
        this.data = err;

      });
    this.resetData();
    this.resetForm();
  }


  //This method allows you to search a Treatment
  findTreatment() {
    const nome = this.form.value.nome;
    const cognome = this.form.value.cognome;
    for (let treatment of this.treatments) {
      if (treatment.owner.nome == nome && treatment.owner.cognome == cognome) {
        this.treatmentCercato.push(treatment);
        this.searchedTreatment = true;
      }
    }
    this.resetForm();
  }

  //This method close the Search Treatment.
  closeSearchedTreatments() {
    this.searchedTreatment = false;
    this.treatmentCercato = [];
  }



  //-----USER METHODS----------

  //This method returns all treatments of a user
  getTreatmentUser() {
    this.httpClient.get<any>(`${environment.baseUrl}/treatment/findOne/${this.userType.id}`).subscribe(
      response => {
        this.data = response;
        if (this.data.status === 201) {
          this.treatmentsUser = this.data.data;
          console.log(this.treatmentsUser);
          this.resetData();
        }
      }, err => {
        this.data = err;
        alert("Something went wrong");
      });
  }
}
