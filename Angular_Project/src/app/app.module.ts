//BASIC IMPORT
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

//COMPONENT IMPORTS
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { InfoComponent } from './components/info/info.component';
import { ContactComponent } from './components/contact/contact.component';

//MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 

//OTHER IMPORT
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InfoComponent,
    ContactComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, 
    MatToolbarModule, 
    MatIconModule,
    FormsModule, 
    BrowserAnimationsModule, 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
