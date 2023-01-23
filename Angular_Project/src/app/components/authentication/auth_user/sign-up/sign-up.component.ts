import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  public signupForm !: FormGroup;

  data : any;


constructor(private formBuilder : FormBuilder, private httpClient : HttpClient, private router : Router) {
}

ngOnInit() : void {
  this.signupForm = this.formBuilder.group({
    fullname : ['', Validators.required],
    lastname : ['', Validators.required],
    email : ['', [Validators.email, Validators.required]],
    password : ['', [Validators.required, Validators.minLength(6)]]
  },
  )
}

signUp() {
  const fullname = this.signupForm.value.fullname;
  const lastname = this.signupForm.value.lastname;
  const email = this.signupForm.value.email;
  const password = this.signupForm.value.password;
  this.httpClient.post(environment.baseUrl + "/signupUser", {fullnameUser : fullname, lastnameUser : lastname, emailUser : email, passwordUser : password}).subscribe(
    res =>{
      this.data=res;
      if(this.data.status==201) {
        alert("Registrazione avvenuta con successo");
        this.toLogin();
      }else {
        alert("Registrazione non avvenuta con successo");
      }
    }
  );
}

toLogin() {
  this.signupForm.reset();
  this.router.navigate(['login']);
}
}
