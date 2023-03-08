import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Models/employee';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  //GENERAL VARIABLES 

  //This is the variable for the FormGroup.
  form !: FormGroup;

  //This is the variable for associated the User access account. (User or Employee).
  userType: any;

  //This is the variable, that indicates if the User is User or Employee, for determinate the div page. 
  isEmployee: boolean | undefined;

  //This is a variable, to associate all Http response.
  data: any;


  showFormUpdateEmail = false;

  showFormUpdatePassword = false;


  password: String | undefined;
  newEmail: String | undefined;
  oldPassword: String | undefined;
  newPassword: String | undefined;
  confirmPassword: String | undefined;
  salt: String | undefined;


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


  /**
   * NgOnInit implementation for this Component.
   */
  ngOnInit(): void {
    this.initForm();
    this.userType = this.userService.getUser();
    if (this.userType instanceof Employee) {
      this.isEmployee = true;
    } else if (this.userType instanceof User) {
      this.isEmployee = false;
    }
  }


  //This is the method for init the FormGroup. 
  initForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }



  updateEmail() {
    this.newEmail = this.form.value.email;
    if (this.userType instanceof User) {
      this.httpClient.post(`${environment.baseUrl}/user/update/${this.userType.id}`, { email: this.newEmail }).subscribe(response => {
        this.data = response;
        if (this.data.status == 200) {
          this.userType.setEmail(this.newEmail);
          alert("Email aggiornata con successo.");
          console.log(this.userType.email);
        } else {
          alert("Email non aggiornata");
        }
      }, err => {
        alert("Something went wrong");
      });
    }
    this.showFormUpdateEmail = false;
    this.resetData();
    this.resetForm();
  }






  updatePasswordUser() {
    if (this.form.value.password === this.form.value.confirmPassword) {
      this.newPassword = this.form.value.confirmPassword;
      const oldPassword = this.form.value.oldPassword;
      this.httpClient.post(`${environment.baseUrl}/user/update/${this.userType.id}`, { oldPassword: oldPassword, password: this.newPassword }).subscribe(response => {
        this.data = response;
        if (this.data.status == 200) {
          alert("Password aggiornata con successo");
        } else {
          alert(this.data.message);
        }
      }, err => {
        alert("Something went wrong");
      });
    } else {
      alert("Password non uguali riprovare");
    }
    this.showFormUpdatePassword = false;
    this.resetData();
    this.resetForm();
  }


  updatePasswordEmployee() {
    if (this.form.value.password === this.form.value.confirmPassword) {
      this.newPassword = this.form.value.confirmPassword;
      const oldPassword = this.form.value.oldPassword;
      this.httpClient.post(`${environment.baseUrl}/employee/update/${this.userType.id}`, { oldPassword: oldPassword, password: this.newPassword }).subscribe(response => {
        this.data = response;
        if (this.data.status == 200) {
          alert("Password aggiornata con successo");
        } else {
          alert(this.data.message);
        }
      }, err => {
        alert("Something went wrong");
      });
    } else {
      alert("Password non uguali riprovare");
    }
    this.showFormUpdatePassword = false;
    this.resetData();
    this.resetForm();
  }

  annulla() {
    this.showFormUpdateEmail = false;
    this.showFormUpdatePassword = false;
    this.resetForm();
    this.resetData();
  }


  //This is the method for reset the Data from backend.
  resetData() {
    this.data = null;
  }


  //This is the method for reset the FormGroup value.
  resetForm() {
    this.form.reset();
  }
}



