import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//IMPORT COMPONENT
import { ContactComponent } from './components/pages/contact/contact.component';
import { HomeComponent } from './components/pages/home/home.component';
import { InfoComponent } from './components/pages/info/info.component';
import { LoginComponent } from './components/authentication/auth_user/login/login.component';
import { SignUpComponent } from './components/authentication/auth_user/sign-up/sign-up.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { LoginEmpComponent } from './components/authentication/auth_employee/login-emp/login-emp.component';
import { SignupEmpComponent } from './components/authentication/auth_employee/signup-emp/signup-emp.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CardComponent } from './components/pages/dashboard/card/card.component';
import { BookingComponent } from './components/pages/dashboard/booking/booking.component';
import { AuthGuard } from './components/authentication/services/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'info', component: InfoComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: ProductsComponent},
  {path: 'login-user', component: LoginComponent}, 
  {path: 'signup-user', component: SignUpComponent},
  {path: 'login-emp', component: LoginEmpComponent}, 
  {path: 'signup-emp', component: SignupEmpComponent},
  {path : 'dashboard', component : DashboardComponent, canActivate : [AuthGuard]},
  {path : 'dashboard/user/:id/card' , component : CardComponent, canActivate : [AuthGuard]},
  {path : 'dashboard/user/:id/booking' , component : BookingComponent, canActivate : [AuthGuard]},
  {path : 'dashboard/user/:id/products' , component : ProductsComponent, canActivate : [AuthGuard]},
  {path : 'dashboard/employee/:id/card' , component : BookingComponent, canActivate : [AuthGuard]},
  {path : 'dashboard/employee/:id/card' , component : ProductsComponent, canActivate : [AuthGuard]},
  {path : '**', redirectTo : ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
