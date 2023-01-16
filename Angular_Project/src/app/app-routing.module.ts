import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//IMPORT COMPONENT
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { DashUserComponent } from './components/dashboard/dash-user/dash-user.component';
import { DashEmployeeComponent } from './components/dashboard/dash-employee/dash-employee.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'info', component: InfoComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent}, 
  {path: 'signup', component: SignUpComponent},
  {path: 'user', component: DashUserComponent}, 
  {path: 'employee', component: DashEmployeeComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
