import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-emp',
  templateUrl: './signup-emp.component.html',
  styleUrls: ['./signup-emp.component.scss']
})
export class SignupEmpComponent implements OnInit {

  public signupForm !: FormGroup;

  data: any;


  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    },
    )
  }

}
