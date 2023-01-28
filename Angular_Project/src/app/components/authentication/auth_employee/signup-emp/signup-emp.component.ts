import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-emp',
  templateUrl: './signup-emp.component.html',
  styleUrls: ['./signup-emp.component.scss']
})
export class SignupEmpComponent implements OnInit {

  public signupForm !: FormGroup;

  data: any;

  isSubscribe = false;


  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      code: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    },
    )
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '300px',
      height: '150px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onSubmit() {
    const fullname = this.signupForm.value.fullname;
    const code = this.signupForm.value.code;
    const password = this.signupForm.value.password;
    this.httpClient.post(environment.baseUrl + "/employee/create", { nameEmployee: fullname, code: code, passwordEmployee: password }).subscribe(
      res => {
        this.data = res;
        if (this.data.status == 201) {
          alert("Registrazione avvenuta con successo");
          console.log(this.data);
          this.openDialog('0ms', '0ms');
          this.toLogin();
        } else {
          alert("Registrazione non avvenuta con successo");
        }
      }
    );

  }


  toLogin() {
    this.signupForm.reset();
    this.data.reset();
    this.router.navigate(['login-emp']);
  }
}

@Component({
  selector: 'app-signup-emp-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['./signup-emp.component.scss'] //Mettere un file singolo per il css
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }
}