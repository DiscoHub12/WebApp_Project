import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from 'src/app/Models/booking';
import { Employee } from 'src/app/Models/employee';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  //---GENERAL VARIABLES----

  //This is the variable for the FormGroup.
  public form !: FormGroup;

  //This is the variable for associated the User access account. (User or Employee).
  userType: User | Employee | undefined;

  //This is the variable, that indicates if the User is User or Employee, for determinate the div page. 
  isVisible = false;

  //This is a variable, to associate all Http response.
  data: any;


  //---VARIABLES FOR EMPLOYEE----

  //Variables that rapresent all Bookings.
  bookings: Booking[] = [];

  //Variables that rapresent all today Bookings
  bookingsToday: Booking[] = [];

  open = false;

  searchedBooking = false;


  //-----VARIABLES FOR USER-----

  //Variable that rapresent the User Bookings.
  bookingsUser: Booking[] = [];

  openList = false;

  searchedBookingsUser: Booking[] = [];

  showFormSearchBookingUser = false;

  showFormAddBookingUser = false;


  //----VARIABLES FOR CALENDAR----

  //This is the variable that indicates if the calendar is visible or not.
  calendarVisible = true;

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    timeZone: 'Europe/Rome',
    events: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.showAlertToAdd.bind(this)
  };


  /**
      * Constructor for this Component. 
      * @param httpClient the HttpClient object.
      * @param authUser the UserService for get the User/Employee logged.
      * @param formBuilder the FormBuilder object for the Forms.
      */
  constructor(
    private httpClient: HttpClient,
    private authUser: UserService,
    private formBuilder: FormBuilder
  ) { }


  //NgOnInit implementation
  ngOnInit() {
    this.initForm();
    this.userType = this.authUser.getUser();
    if (this.userType instanceof Employee) {
      this.isVisible = true;
    } else if(this.userType instanceof User){
      this.isVisible = false;
      this.getBookingUser();
    }
    this.getAllBookings();
  }

  //This is the method for init the FormGroup. 
  initForm() {
    this.form = this.formBuilder.group({
      dataPrenotazione: ['dd-MM-yyyy', Validators.required],
      oraPrenotazione: ['', Validators.required],
      nome: ['', Validators.required],
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
        this.stampData();
      }
      else {
        alert("Error");
      }
    }, err => {
      alert("Something went wrong");

    });
    this.resetData();
  }

  //This method print booking in the calendar
  stampData() {
    let events: any[] = [];
    for (let i = 0; i < this.bookings.length; i++) {
      const booking = this.bookings[i];
      const date = new Date(booking.dataPrenotazione).toISOString().replace(/T.*$/, '');
      console.log(date);
      if (this.userType instanceof User) {
        if (booking.idUtente === this.userType?.getId()) {
          events.push({
            title: booking.trattamento,
            start: date + 'T' + booking.oraInizio,
            end: date + 'T' + booking.oraFine,
            color: 'green'
          });
        } else {
          events.push({
            title: "Prenotazione",
            start: date + 'T' + booking.oraInizio,
            end: date + 'T' + booking.oraFine,
            color: 'red'
          });
        }
      } else {
        events.push({
          title: booking.trattamento,
          start: date + 'T' + booking.oraInizio,
          end: date + 'T' + booking.oraFine,
          color: this.getRandomColor()
        });
      }
    }
    this.calendarOptions.events = events;
  }


  private getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  //This method returns all bookings of the day
  getAllBookingsToday() {
    this.openList = true;
    this.bookingsToday = [];
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


  //This method set complete booking
  setCompletata(booking: Booking) {
    if (booking.completata === 0) {
      const descrizione = this.completaPrenotazioneConDescrizione();
      this.httpClient.post(`${environment.baseUrl}/booking/update/${booking.id}`, { completata: 1 }).subscribe(
        response => {
          this.data = response;
          if (this.data.status == 200) {
            this.addTreatment(booking, descrizione);
            booking.completata = 1;
          } else {
            alert("Prenotazione non aggiornata riprovare");
          }
        }, err => {
          alert("Something went wrong");
        });
    } else {
      alert("Prenotazione già completata");
    }
  }


  completaPrenotazioneConDescrizione() {
    const descrizione = prompt("Inserisci una descrizione per il trattamento");
    return descrizione;
  }


  //This method create new Treatment when booking is completed
  addTreatment(booking: Booking, descrizione: string | null) {
    this.httpClient.post(`${environment.baseUrl}/treatment/create`, { idUtente: booking.idUtente, nomeTrattamento: booking.trattamento, descrizione: descrizione, data: booking.dataPrenotazione }).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("Trattamento aggiunto con successo.");
        } else {
          alert("Trattamento non aggiunto riprovare");
        }
      }, err => {
        alert("Something went wrong");
      });
  }


  //This method allows you to search a Bookings of a specific user
  searchBookingsUser() {
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

  removeBookingEmp(booking: Booking) {
    this.httpClient.post(`${environment.baseUrl}/booking/delete/${booking.id}`, {}).subscribe(response => {
      this.data = response;
      if (this.data.status === 200) {
        alert("Prenotazione rimossa con successo.");
      } else {
        alert("Error.");
      }
    }, err => {
      alert("Something went wrong.");
    });
    const index = this.bookingsToday.indexOf(booking);
    this.bookingsToday.splice(index);
    const index1 = this.searchedBookingsUser.indexOf(booking);
    this.searchedBookingsUser.splice(index1);
    this.getAllBookings();
    this.resetData();
  }




  //-----USER METHODS-------

  //This method returns all bookings of a user
  getBookingUser() {
    if (this.userType) {
      this.httpClient.get<any>(`${environment.baseUrl}/booking/findAllUser/${this.userType.id}`).subscribe(
        response => {
          this.data = response;
          if (this.data.status === 200) {
            this.bookingsUser = this.data.data;
            console.log(this.bookingsUser);
            this.stampData();
          }
        }, err => {
          alert("Something went wrong");
        });
    }
    this.resetData();
  }



  //This method allows user to search a Bookings
  searchBookings() {
    const dataPrenotazione = new Date(this.form.value.dataPrenotazione);
    let prenotazioneTrovata = false;
    for (let booking of this.bookingsUser) {
      const bookingDate = new Date(booking.dataPrenotazione);
      if (bookingDate.getTime() === dataPrenotazione.getTime()) {
        this.searchedBookingsUser.push(booking);
        alert("Prenotazione trovata con successo.");
        this.searchedBooking = true;
        prenotazioneTrovata = true;
        this.showFormSearchBookingUser = false;
      }
    }
    if (!prenotazioneTrovata) {
      alert("Prenotazione non trovata. Riprovare.");
    }
    this.resetForm();
  }

  removeBookingUser(booking: Booking) {
    this.httpClient.post(`${environment.baseUrl}/booking/delete/${booking.id}`, {}).subscribe(response => {
      this.data = response;
      if (this.data.status === 200) {
        alert("Prenotazione rimossa con successo.");
      } else {
        alert("Error.");
      }
    }, err => {
      alert("Something went wrong.");
    });
    const index = this.searchedBookingsUser.indexOf(booking);
    this.searchedBookingsUser.splice(index);
    this.getAllBookings();
    this.getAllBookingsToday();
    this.getBookingUser();
    this.resetData();
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


  //This method close the Search Booking.
  closeSearchedBookingsUser() {
    this.getBookingUser();
    this.searchedBooking = false;
    this.searchedBookingsUser = [];
    this.showFormSearchBookingUser = false;
  }

  completata(booking: Booking) {
    if (booking.completata === 0)
      return "No"
    else
      return "Si'"
  }


  close() {
    this.openList = false;
    this.bookingsToday = [];
  }




  //-----CALENDAR METHODS----------

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }


  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  showAlertToAdd(selectInfo: DateSelectArg) {
    const title = prompt('Inserisci il nome del trattamento da effettuare');
    const nome = prompt('Inserisci il nome del cliente');
    const cognome = prompt('Inserisci il cognome del cliente');

    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); //  clear date selection

    if (title && nome && cognome) {
      if (this.userType instanceof User) {
        if (nome != this.userType.nome || cognome != this.userType.cognome) {
          alert("Nome e cognome errati. Riprovare.");
        } else {
          this.addBooking(selectInfo, title, nome, cognome);
        }
      } else if(this.userType instanceof Employee){
        this.addBooking(selectInfo, title, nome, cognome);
      }
    }
  }

  addBooking(selectInfo: DateSelectArg, title: string, nome: string, cognome: string) {
    this.httpClient.post(`${environment.baseUrl}/booking/create`, {
      nome: nome, cognome: cognome, dataPrenotazione: selectInfo.view.activeStart, oraInizio: selectInfo.startStr,
      oraFine: selectInfo.endStr, trattamento: title, completata: 0
    }).subscribe(response => {
      this.data = response;
      if (this.data.status === 201) {
        alert("Prenotazione aggiunta con successo.");
        if (this.userType instanceof User) {
          this.getAllBookings();
          this.getBookingUser();
        } else if (this.userType instanceof Employee) {
          this.getAllBookings();
        }
      }
    }, err => {
      alert("Errore");
    });
  }
}

