import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user'
import { environment } from 'src/environments/environments';
import { Router, UrlTree } from '@angular/router';
//import { AuthService } from '../../auth.service';
//import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;

  userLogged : User | undefined;

  data : any; 

  constructor(private httpClient: HttpClient, private formBuilder : FormBuilder, private router : Router) { }


  ngOnInit(): void { 
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.email], 
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.httpClient.post(environment.baseUrl + '/loginUser', { email: email, passwordUser: password }).subscribe(
      res => {
        this.data = res;
        if (this.data.status == 201) {
          alert('Login successfully.');
         // this.userLogged = new User(this.data.id, this.data.fullname, this.data.lastname);
          //this.authService.setUserData(this.userLogged);
          this.router.navigate(['dashboard/user']);
        } else {
          alert("Password not correct.");
        }
      }, err => {
        alert('Password not correct.');
      }
    );
  }

}




 /**
  *  loginMethod(){
    this.httpClient.get<any>(environment.baseUrl + 'loginUser').subscribe(res =>{
      this.userLogged = res.find((a: any) => {
        return a.eemail === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(this.userLogged){
      alert('Login Success'); 
      this.loginForm.reset();
      }else {
        alert("Error");
      }
    }, err => {
      alert("Something went wrong");
    })
  }
  */
