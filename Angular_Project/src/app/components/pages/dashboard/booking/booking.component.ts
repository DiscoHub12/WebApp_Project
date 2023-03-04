import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from 'src/app/Models/booking';
import { Employee } from 'src/app/Models/employee';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  //This is the variable for the FormGroup.
  public form !: FormGroup;

  //This is the variable for associated the User access account. (User or Employee).
  userType: User | Employee | undefined;

  //This is the variable, that indicates if the User is User or Employee, for determinate the div page. 
  isVisible = false;

  //Variables that rapresent all Bookings.
  bookings: Booking[] = [];

  //This is a variable, to associate all Http response.
  data: any;

  //Variable that rapresent the date selected.
  selected!: Date | null;


  open = false;

  searchedBooking = false;

  //Variables that rapresent all today Bookings
  bookingsToday: Booking[] = [];



  //-----VARIABLES FOR USER-----

  //Variable that rapresent the User Bookings.
  bookingsUser: Booking[] = [];

  openList = false;

  searchedBookingsUser: Booking[] = [];

  showFormSearchBookingUser = false;

  showFormAddBookingUser = false;



  constructor(
    private authUser: UserService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.initForm();
    this.userType = new Employee(1, "Sofia", "Scattolini", 0);
    //this.userType = this.authUser.getUser();
    if (this.userType instanceof Employee) {
      this.isVisible = true;
      this.getAllBookings();
    } else {
      this.isVisible = false;
      this.getBookingUser();
    }
  }

  //This is the method for init the FormGroup. 
  initForm() {
    this.form = this.formBuilder.group({
      dataPrenotazione: ['dd-MM-yyyy', Validators.required],
      oraPrenotazione: ['', Validators.required],
      nome : ['', Validators.required],
      cognome: ['', Validators.required]
    });
  }



  //-----EMPLOYEE METHODS------


  //This method returns all bookings
  getAllBookings() {
    this.httpClient.get<any>(`${environment.baseUrl}/booking/findAll`).subscribe(response => {
      this.data = response;
      if (this.data.status === 200) {
        this.bookings = this.data.data;
        this.getAllBookingsToday();
        console.log(this.bookings);
        this.resetData();
      }
      else {
        alert("Error");
      }
    }, err => {
      alert("Something went wrong");

    });
  }

  //This method returns all bookings of the day
  getAllBookingsToday() {
    const dataCorrente = new Date();
    for (const booking of this.bookings) {
      const dataPrenotazione = new Date(booking.dataPrenotazione);
      if (dataPrenotazione.getDate() === dataCorrente.getDate() &&
          dataPrenotazione.getMonth() === dataCorrente.getMonth() &&
          dataPrenotazione.getFullYear() === dataCorrente.getFullYear()) {
        this.bookingsToday.push(booking);
      }
    }
  }


  searchBookingsUser(){
    const nome = this.form.value.nome;
    const cognome = this.form.value.cognome;
    let clienteTrovato = false;
    for (let booking of this.bookings) {
      if (booking.owner.nome === nome && booking.owner.cognome === cognome) {
        this.searchedBookingsUser.push(booking);
        this.searchedBooking = true;
        this.showFormSearchBookingUser = false;
        clienteTrovato = true;
      }
    }
    if (!clienteTrovato) {
      alert("Cliente non trovato, riprova.");
    }
    this.resetForm();
  }
    



  //-----USER METHODS----------

  //This method returns all bookings of a user
  getBookingUser() {
    if (this.userType) {
      this.httpClient.get<any>(`${environment.baseUrl}/booking/findAllUser/${this.userType.id}`).subscribe(
        response => {
          this.data = response;
          if (this.data.status === 200) {
            this.bookingsUser = this.data.data;
            console.log(this.bookingsUser);
            this.resetData();
          }
        }, err => {
          alert("Something went wrong");
        });
    }
  }

  searchBookings() {
    const dataPrenotazione = new Date(this.form.value.dataPrenotazione);
    for (let booking of this.bookingsUser) {
      const bookingDate = new Date(booking.dataPrenotazione);
      if (bookingDate.getTime() === dataPrenotazione.getTime()) {
        this.searchedBookingsUser.push(booking);
        this.searchedBooking = true;
      }
    }
    this.resetForm();
  }




  //-----OTHER METHODS----------

  //This is the method for reset the FormGroup value.
  resetForm() {
    this.form.reset();
  }


  //This is the method for reset the Data from backend.
  resetData() {
    this.data = null;
  }

  completata(booking: Booking) {
    if (booking.completata === 0)
      return "No"
    else 
      return "Si'"
  }

  //This method close the Search Booking.
  closeSearchedBookingsUser() {
    this.searchedBooking = false;
    this.searchedBookingsUser = [];
    this.showFormSearchBookingUser = false;
  }

  
  close(){
    this.openList = false;
  }

}

