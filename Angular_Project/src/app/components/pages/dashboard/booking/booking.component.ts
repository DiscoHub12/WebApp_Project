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


  open = false;

  searchedBooking = false;



  //-----VARIABLES FOR USER-----

  //Variable that rapresent the User Bookings.
  bookingsUser: Booking[] = [];

  openList = false;

  searchedBookingsUser: Booking[] = [];

  showFormSearchBookingUser = false;



  constructor(
    private authUser: UserService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.initForm();
    this.userType = new User(1, "Sofia", "Scattolini");
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
      dataPrenotazione: ['dd-MM-yyyy', Validators.required]
    });
  }



  //-----EMPLOYEE METHODS------


  //This method returns all bookings
  getAllBookings() {
    this.httpClient.get<any>(`${environment.baseUrl}/booking/findAll`).subscribe(response => {
      this.data = response;
      if (this.data.status === 201) {
        this.bookings = this.data.data;
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



  //-----USER METHODS----------

  //This method returns all bookings of a user
  getBookingUser() {
    if (this.userType) {
      this.httpClient.get<any>(`${environment.baseUrl}/booking/findOne/${this.userType.id}`).subscribe(
        response => {
          this.data = response;
          if (this.data.status === 201) {
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


}

