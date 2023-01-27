import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-emp',
  templateUrl: './login-emp.component.html',
  styleUrls: ['./login-emp.component.scss']
})
export class LoginEmpComponent implements OnInit {

  //Attributes-variables for thid component: 
  public loginForm !: FormGroup;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //Method for this Component:
  onSubmit() {

  }
}
