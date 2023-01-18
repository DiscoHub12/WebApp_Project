import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  public signupForm !: FormGroup;

  disabled = true;


constructor(private formBuilder : FormBuilder, private httpClient : HttpClient, private router : Router) {
}

ngOnInit() : void {
  this.signupForm = this.formBuilder.group({
    fullname : ['', Validators.required],
    lastname : ['', Validators.required],
    email : ['', Validators.required],
    password : ['', Validators.required]
  },
  )
}

signUp() {
  const fullname = this.signupForm.value.fullname;
  const lastname = this.signupForm.value.lastname;
  const email = this.signupForm.value.email;
  const password = this.signupForm.value.password;
  this.disabled = false;
  this.httpClient.post(environment.baseUrl + "/signupUser", {fullnameUser : fullname, lastnameUser : lastname, emailUser : email, passwordUser : password}).subscribe();
}

}
