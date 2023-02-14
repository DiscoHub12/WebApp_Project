//BASIC IMPORT
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

//COMPONENT IMPORTS
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { InfoComponent } from './components/pages/info/info.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/pages/dashboard/header/header.component';
import { SidenavComponent } from './components/pages/dashboard/sidenav/sidenav.component';
import { BookingComponent } from './components/pages/dashboard/booking/booking.component';
import { CardComponent } from './components/pages/dashboard/card/card.component';
import { TreatmentsComponent } from './components/pages/dashboard/treatments/treatments.component';
import { LoginComponent } from './components/authentication/auth_user/login/login.component';
import { SignUpComponent } from './components/authentication/auth_user/sign-up/sign-up.component';
import { SignupEmpComponent } from './components/authentication/auth_employee/signup-emp/signup-emp.component';
import { LoginEmpComponent } from './components/authentication/auth_employee/login-emp/login-emp.component';
import { WelcomeComponent } from './components/pages/dashboard/welcome/welcome.component';
import { GiftsComponent } from './components/pages/dashboard/gifts/gifts.component';

//MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { ScrollingModule } from '@angular/cdk/scrolling';


//OTHER IMPORT
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    ContactComponent,
    ProductsComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    BookingComponent,
    CardComponent,
    TreatmentsComponent,
    LoginComponent,
    SignUpComponent,
    SignupEmpComponent,
    LoginEmpComponent,
    WelcomeComponent,
    GiftsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, 
    MatToolbarModule, 
    MatIconModule,
    FormsModule, 
    BrowserAnimationsModule, 
    MatSelectModule, 
    ReactiveFormsModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatSidenavModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    ScrollingModule

  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
