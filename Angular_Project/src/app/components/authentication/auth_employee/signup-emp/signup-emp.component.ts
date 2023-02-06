import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-signup-emp',
  templateUrl: './signup-emp.component.html',
  styleUrls: ['./signup-emp.component.scss'], 
  
})


export class SignupEmpComponent implements OnInit {

  //variable for FormGroup
  public signupForm !: FormGroup;

  //Variable for associate the response Http when Registration is successful
  response : any;

  /**
   * Constructor for this Component.
   * @param formBuilder the FormBuilder for all Form and check data in HTML. 
   * @param httpClient the HttpClient module for this component.
   * @param router the Router module for this component for navigation.
   */
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {
  }

  //NgOnInit implementation
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      code: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]], 
      restriction: ['', Validators.required],
    },
    )
  }

  /**
   * Method for registration the new Employee.
   */
  onSubmit(){
    const fullName = this.signupForm.value.fullname;
    const code = this.signupForm.value.code;
    const password = this.signupForm.value.password;
    let restriction; 
    if(this.signupForm.value.restriction == true){
      restriction = 0;
    }else restriction = 1;
    this.httpClient.post(`${environment.baseUrl}/employee/registration`, {
      nameEmployee : fullName,
      code : code,
      passwordEmployee : password,
      restrizioni : 0
    }).subscribe(
      response => {
        this.response = response;
        if(this.response.status == 201){
          alert("Registrazione avvenuta con successo.");
          this.router.navigate(['login-emp']);
          this.resetForm();
        }else {
          alert("Registrazione non riuscita.");
        }
      });
  }

  //This method reset the form value of FormGroup.
  resetForm() {
    this.signupForm.reset();
  }
}

