import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Treatments } from 'src/app/Models/treatments';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss']
})
export class TreatmentsComponent {

  //variable for FormGroup
  public addForm !: FormGroup;

  userType: any;
  data: any;
  showForm = false;
  response : any;

  treatments = [
    { id: 1, userId: 100, name: 'Trattamento 1', description: 'Descrizione trattamento 1', dueDate: new Date('2022-12-30') },
    { id: 2, userId: 200, name: 'Trattamento 2', description: 'Descrizione trattamento 2', dueDate: new Date('2022-01-01') },
  ];
  currentDate = new Date();
  

  constructor(private authUser: UserService, private httpClient: HttpClient, private formBuilder: FormBuilder, private router: Router) {}


  ngOnInit() {
    this.userType = this.authUser.getUser();
    this.addForm = this.formBuilder.group({
      idUser : ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });

  }

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

  addTreatment(){
    const idUser = this.addForm.value.idUser;
    const name = this.addForm.value.name;
    const description = this.addForm.value.description;
    const date = this.addForm.value.date;
    this.httpClient.post<any>(`${environment.baseUrl}/treatment/create`, { 
      idUtente: idUser,
      nome: name,
      descrizione: description,
      data: date
}).subscribe(
  response => {
    if (response.status === 201) {
      alert("Trattamento aggiunto con successo");
      this.showForm = false;
    }else {
      alert("Aggiunta non avvenuta");
    }});
  }
}
