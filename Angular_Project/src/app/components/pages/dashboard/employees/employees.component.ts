import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Models/employee';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  //GENERAL VARIABLES 

  //This is the variable for the FormGroup.
  form !: FormGroup;

  //This is the variable for associated the User access account. (User or Employee).
  userType: any

  //This is the variable, that indicates if the User is User or Employee, for determinate the div page. 
  haveRestriction: boolean | undefined;

  //This is a variable, to associate all Http response.
  data: any;

  //VARIABLES FOR EMPLOYEE WITH 0 RESTRICTION

  //Variable to which all Employee accounts within the platform are associated.
  allEmployeeAccounts: Employee[] = [];

  //Boolean variable that indicates if the Employee want to create a new Account.
  showFormCreateAccount = false;

  //Boolean variable that indicates if the Employee want to searc an Account.
  showFormSearchAccount = false;

  //Boolean variable that indicates if the Employee searched and found an Account.
  searched = false;

  //Temporary variable to which the Account of the searched 
  accountSearch: any;

  //VARIABLES EMPLOYEE WITH 1 RESTRICTION

  //nothing.


  /**
     * Constructor for this Component. 
     * @param httpClient the HttpClient object.
     * @param userService the UserService for get the User/Employee logged.
     * @param formBuilder the FormBuilder object for the Forms.
     */
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  //NgOnInit implementation for this Component.
  ngOnInit(): void {
    this.initForm();
    this.userType = this.userService.getUser();
    if (this.userType instanceof Employee) {
      if (this.userType.restrizioni == 0) {
        this.haveRestriction = false;
        this.getAllEmployeeAccounts();
      } else {
        this.haveRestriction = true;
      }
    }
  }

  //This is the method for init the FormGroup. 
  initForm() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      codice: ['', Validators.required],
      password: ['', Validators.required],
      restrizioni: ['', Validators.required],
    });
  }


  /**
   * This method contacts the Backend to fetch all created (Employee)
   * accounts within the platform.
   */
  getAllEmployeeAccounts() {
    this.httpClient.get<any>(`${environment.baseUrl}/employee/findAll`).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          this.allEmployeeAccounts = this.data.data;
          this.resetFormAndData();
        } else alert("Error");
        this.resetFormAndData();
      }, err => {
        alert("Something went wrong.");
        this.resetFormAndData();
      });
    this.resetFormAndData();
  }

  /**
   * This method allows you to create a new Employee account 
   * in this platform, that contact the Backend.
   */
  createEmployeeAccount() {
    const nome = this.form.value.nome;
    const codice = this.form.value.codice;
    const password = this.form.value.password;
    let restrizioni;
    if (this.form.value.restrizioni == true) {
      restrizioni = 0;
    } else restrizioni = 1;
    this.httpClient.post(`${environment.baseUrl}/employee/registration`, {
      nameEmployee: nome,
      code: codice,
      passwordEmployee: password,
      restrizioni: restrizioni
    }).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("Registrazione avvenuta con successo.");
          this.closeCreateAccount();
        } else {
          alert("Registrazione non riuscita.");
          this.closeCreateAccount();
        }
      });
    this.closeCreateAccount();
  }

  closeCreateAccount() {
    this.resetFormAndData();
    this.getAllEmployeeAccounts();
    this.showFormCreateAccount = false;
  }

  /**
   * This method allows you to remove an Employee Account, 
   * passing the unique id, by contacting the Backend.
   */
  removeAccountEmployee(id: Number) {
    this.httpClient.post(`${environment.baseUrl}/employee/delete/${id}`, {}).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          alert("Account Rimosso con successo.");
          this.closeRemoveAccount();
        } else {
          alert("Error.");
          this.closeRemoveAccount();
        }
      }, err => {
        alert("Something went wrong.");
        this.closeRemoveAccount();
      });
  }

  closeRemoveAccount() {
    this.resetFormAndData();
    this.getAllEmployeeAccounts();
  }

  /**
   * This method allows you to search an Employee Account.
   */
  searchAccount() {
    const nome = this.form.value.nome;
    for (let account of this.allEmployeeAccounts) {
      if (account.nome == nome) {
        this.accountSearch = account;
        this.searched = true;
      }
    }
  }

  undoSearchAccount() {
    this.accountSearch = null;
    this.searched = false;
    this.showFormSearchAccount = false;
    this.resetFormAndData();
  }

  resetFormAndData() {
    this.data = null;
    this.form.reset();
  }

  undoCreation() {
    this.resetFormAndData();
    this.showFormCreateAccount = false;
  }

}
