import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user'
import { environment } from 'src/environments/environments';
import { Router, UrlTree } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from '../../services/auth.service';
//import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Variable for FormGroup
  public loginForm !: FormGroup;

  //Variable for associate the response Http when Login is successful.
  response: any;

  /**
   * Constructor for LoginComponent.
   * @param httpClient the HttpClient module for this component.
   * @param formBuilder the formBuilder for all Form and check data in HTML.
   * @param router  the Router module for this component for navigation. 
   * @param userService service for send Data (User) to other Components.

   */
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  //NgOnInit implementation.
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  //Login method.
  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.httpClient.post(`${environment.baseUrl}/user/login`, { email: email, password: password }).subscribe(
      response => {
        this.response = response;
        if (this.response.status == 201) {
          alert('Login successfully.');
          const userLogged = new User(this.response.jsonResponse.id, this.response.jsonResponse.nome, this.response.jsonResponse.cognome);
          console.log("User logged: " + JSON.stringify(userLogged));
          console.log("Access token: " + JSON.stringify(this.response.access_token) + "Refresh token: " + JSON.stringify(this.response.refresh_token));
          this.userService.setUser(userLogged);
          this.authService.saveToken(this.response.access_token, this.response.refresh_token);
          alert("Login successful");
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
