import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
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

  //This is the variable for associated the User access account. (User or Employee).
  userType: User | Employee | undefined;

  //This is the variable, that indicates if the User is User or Employee, for determinate the div page. 
  isVisible = false;

  //Variables that rapresent all Bookings.
  bookings: Booking[] = [];

  //This is a variable, to associate all Http response.
  data: any;


  open = false;





  constructor(
    private authUser: UserService,
    private httpClient: HttpClient
  ) { }


  ngOnInit() {
    this.userType = new User (1, "Sofia", "Scattolini");
    //this.userType = this.authUser.getUser();
    if (this.userType instanceof Employee) {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  getAllBookings() {
    this.httpClient.get<any>(`${environment.baseUrl}/booking/findAll`).subscribe(response => {
      this.data = response;
      if (this.data.status === 201) {
        this.bookings = this.data.data;
        console.log(this.bookings);
      }
      else {
        alert("Error");
      }
    }, err => {
      alert("Something went wrong");

    });
  }


}
