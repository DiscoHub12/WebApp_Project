import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environments';
import { Employee } from 'src/app/Models/employee';
//import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-emp',
  templateUrl: './login-emp.component.html',
  styleUrls: ['./login-emp.component.scss']
})
export class LoginEmpComponent implements OnInit {

  //Attributes-variables for thid component: 
  public loginForm !: FormGroup;

  //Data for associate the response
  data: any;

  employeeLogged: Employee | undefined;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //Method for this Component:
  onSubmit() {
    const code = this.loginForm.value.code;
    const password = this.loginForm.value.password;
    this.httpClient.post(environment.baseUrl + '/loginEmployee', { code: code, passwordUser: password }).subscribe(
      res => {
        this.data = res;
        if (this.data.status == 201) {
          alert('Login successfully.');
          this.employeeLogged = new Employee(this.data.id, this.data.nome, this.data.codice, this.data.restrizioni);
         // this.authService.setUserData(this.employeeLogged);
          this.router.navigate(['dashboard/employee']);
        } else {
          alert("Password not correct.");
        }
      }, err => {
        alert('Password not correct.');
      }
    );
  }
}
