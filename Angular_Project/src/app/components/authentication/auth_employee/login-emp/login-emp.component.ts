import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environments';
import { Employee } from 'src/app/Models/employee';
import { UserService } from 'src/app/service/user.service';
//import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-emp',
  templateUrl: './login-emp.component.html',
  styleUrls: ['./login-emp.component.scss']
})
export class LoginEmpComponent implements OnInit {

  //variable for FormGroup 
  public loginForm !: FormGroup;

  //Variable for associate the response Http when Login is successful.
  response : any;

  /**
   * Constructor for this Component.
   * @param httpClient  the HttpClient module for this component.
   * @param formBuilder the formBuilder for all Form and check data in HTML. 
   * @param router the Router module for this component for navigation. 
   * @param userService service for send Data (User) to other Components.
   */
  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  //NgOnInit implementation.
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //Login method.
  onSubmit() {
    const code = this.loginForm.value.code;
    const password = this.loginForm.value.password;
    this.httpClient.post(`${environment.baseUrl}/employee/login`, { 
      codice: code, 
      password: password 
    }).subscribe(
      response => {
        this.response = response; 
        if (this.response.status == 201) {
          alert('Login successfully.');
          const employeeLogged = new Employee(this.response.json.id, this.response.json.nome, this.response.json.codice, this.response.json.restrizioni);
          this.userService.setUser(employeeLogged);
          //IN QUESTA PARTE, DEVONO ESSERE PRESI I TOKEN E SALVARLI IN LOCAL STORAGE.
          //this.router.navigate(['dashboard/employee']);
        } else {
          alert("Password not correct.");
        }
      }, err => {
        alert('Password not correct.');
      }
    );
  }
}
