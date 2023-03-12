import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  userType: User | Employee | undefined;

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

  nullTreatments = false;

  nomeUtenteCercato = null;

  cognomeUtenteCercato = null;




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
    } else if (this.userType instanceof User) {
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

  indietro() {
    this.searchedTreatment = false;
    this.cognomeUtenteCercato = null;
    this.nomeUtenteCercato = null;
    this.treatmentCercato = [];
    this.ngOnInit();
  }




  //-----EMPLOYEE METHODS------

  //This method returns all treatments
  getAllTreatments() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    this.httpClient.get<any>(`${environment.baseUrl}/treatment/findAll`, httpOptions).subscribe(response => {
      this.data = response;
      if (this.data.status === 200) {
        this.treatments = this.data.data;
        console.log(this.treatments);
      }
      else if (this.data.status === 404) {
        alert("Errore nella ricerca dei trattamenti.");
      } else {
        alert("Errore.");
      }
    }, err => {
      alert("Something went wrong");

    });
  }

  //This method add a new treatment 
  addTreatment() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    const nome = this.nomeUtenteCercato;
    const cognome = this.cognomeUtenteCercato;
    const name = this.form.value.nomeTrattamento;
    const description = this.form.value.descrizione;
    let date: any;
    let dataDaControllare = new Date(this.form.value.data);
    let dataCorrente = new Date();

    if (dataDaControllare.getTime() > dataCorrente.getTime()) {
      this.resetForm();
      alert("Data incorrect");
    } else date = this.form.value.data;

    this.httpClient.put(`${environment.baseUrl}/treatment/create`, {
      nome: nome,
      cognome: cognome,
      nomeTrattamento: name,
      descrizione: description,
      data: date
    }, httpOptions).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("Trattamento aggiunto con successo. Uscire e rientrare.");
          this.showFormAddTreatment = false;
        } else if (this.data.status == 404) {
          alert("Utente non trovato riprovare.");
        } else {
          alert("Errore nella creazione del trattamento.");
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
    if (this.treatments.length === 0) {
      alert("Non ci sono trattamenti.");
      trattamentoTrovato = true;
    } else {
      for (let treatment of this.treatments) {
        if (treatment.nome == nome && treatment.cognome == cognome) {
          this.treatmentCercato.push(treatment);
          if (this.treatmentCercato == null) {
            this.nullTreatments = true;
          }
          this.nomeUtenteCercato = nome;
          this.cognomeUtenteCercato = cognome;
          this.searchedTreatment = true;
          trattamentoTrovato = true;
        }
      }
    }
    if (!trattamentoTrovato) {
      alert("Utente non trovato o non registrato");
    }
    this.resetForm();
  }


  delete(trattamento: Treatments) {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    this.httpClient.delete(`${environment.baseUrl}/treatment/delete/${trattamento.id}`, httpOptions).subscribe(response => {
      this.data = response;
      if (this.data.status === 200) {
        alert("Trattamento rimosso con successo.");
        const index = this.treatmentCercato.indexOf(trattamento);
        this.treatmentCercato.splice(index, 1);
        const index1 = this.treatments.indexOf(trattamento);
        this.treatments.splice(index1, 1);
      } else if (this.data.status === 404) {
        alert("Trattamento non trovato riprovare.");
      } else {
        alert("Errore nella rimozione.");
      }
    }, err => {
      alert("Something went wrong.");
    });
    this.resetData();
  }



  //-----USER METHODS----------

  //This method returns all treatments of a user
  getTreatmentUser() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    if (this.userType instanceof User) {
      this.httpClient.get<any>(`${environment.baseUrl}/treatment/findAllUser?nome=${this.userType.nome}&cognome=${this.userType.cognome}`,  httpOptions).subscribe(
        response => {
          this.data = response;
          if (this.data.status === 200) {
            this.treatmentsUser = this.data.data;
            console.log(this.treatmentsUser);
            this.resetData();
          } else if (this.data.status == 404) {
            alert("Utente non trovato riprovare.");
          } else {
            alert("Errore.");
          }
        }, err => {
          alert("Something went wrong");
        });
    }
  }


  searchTreatments() {
    const nomeTrattamento = this.form.value.nome;
    let trattamentoTrovato = false;
    for (let treatment of this.treatmentsUser) {
      if (treatment.nomeTrattamento == nomeTrattamento) {
        this.searchedTreatmentUser.push(treatment);
        this.searchedTreatment = true;
        trattamentoTrovato = true;
        this.showFormSearchTreatmentUser = false;
      }
    }
    if (!trattamentoTrovato) {
      alert("Nome errato, reinserirlo");
    }
    this.resetForm();
  }

  //This method close the Search Treatment.
  closeSearchedTreatmentsUser() {
    this.searchedTreatment = false;
    this.showFormSearchTreatmentUser = false;
    this.searchedTreatmentUser = [];
  }
}
