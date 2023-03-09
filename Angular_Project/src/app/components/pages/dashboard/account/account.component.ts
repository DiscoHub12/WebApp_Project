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

  //Boolean variables to indicate the visibility of the information.
  showInformation = true;

  //Boolean variables to indicate if the User want to update the email.
  showFormUpdateEmail = false;

  //Boolean variables to indicate if the User or Employee want to update the password.
  showFormUpdatePassword = false;


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
    //this.userType = this.userService.getUser();
    this.userType = new User(1, "Sofia", "Scattolini", "sofiascattolini@gmail.com");
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


  //----EMPLOYEE METHODS----

  /**
   * Method that contact the Backend to update the Password.
   */
  updatePasswordEmployee() {
    if (this.form.value.password === this.form.value.confirmPassword) {
      const newPassword = this.form.value.confirmPassword;
      const oldPassword = this.form.value.oldPassword;
      this.httpClient.post(`${environment.baseUrl}/employee/update/${this.userType.id}`, { oldPassword: oldPassword, newPassword: newPassword }).subscribe(
        response => {
          this.data = response;
          if (this.data.status == 200) {
            alert("Password aggiornata con successo.");
            this.closeUpdatePassword();
          } else if (this.data.status == 404) {
            alert("Password errata.");
            this.closeUpdatePassword();
          }
        }, err => {
          alert("Something went wrong");
          this.closeUpdatePassword();
        });
    }
  }


  //-----USER METHODS-----

  /**
   * Method that contact the Backend to update the email information for User.
   */
  updateEmail() {
    const newEmail = this.form.value.email;
    if (this.userType instanceof User) {
      this.httpClient.post(`${environment.baseUrl}/user/updateEmail/${this.userType.id}`, { email: newEmail }).subscribe(response => {
        this.data = response;
        if (this.data.status == 200) {
          this.userType.setEmail(newEmail);
          alert("Email aggiornata con successo.");
          this.closeUpdateEmail();
        } else {
          alert("Email non aggiornata");
          this.closeUpdateEmail();
        }
      }, err => {
        alert("Something went wrong");
        this.closeUpdateEmail();
      });
    }
    this.closeUpdateEmail();
  }


  /**
   * Method that contact the Backend to update the password information for User.
   */
  updatePasswordUser() {
    if (this.form.value.password === this.form.value.confirmPassword) {
      const newPassword = this.form.value.confirmPassword;
      const oldPassword = this.form.value.oldPassword;
      this.httpClient.post(`${environment.baseUrl}/user/updatePassword/${this.userType.id}`, { oldPassword: oldPassword, newPassword: newPassword }).subscribe(response => {
        this.data = response;
        if (this.data.status == 200) {
          alert("Password aggiornata con successo");
          this.closeUpdatePassword();
        } else {
          alert(this.data.message);
          this.closeUpdatePassword();
        }
      }, err => {
        this.data = err;
        alert(this.data.message);
        this.closeUpdatePassword();
      });
    } else {
      alert("Le password non corrispondono.");
      this.closeUpdatePassword();
    }
    this.closeUpdatePassword();
  }


  //----GENERIC METHODS-----

  closeUpdatePassword() {
    this.showFormUpdatePassword = false;
    this.resetData();
    this.resetForm();
  }


  closeUpdateEmail() {
    this.showFormUpdateEmail = false;
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



