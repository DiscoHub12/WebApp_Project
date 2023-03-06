import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/Models/card';
import { Employee } from 'src/app/Models/employee';
import { Gift } from 'src/app/Models/gift';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent implements OnInit {



  //GENERAL VARIABLES 

  //This is the variable for the FormGroup.
  form !: FormGroup;

  //This is the variable for associated the User access account. (User or Employee).
  userType: User | Employee | undefined;

  //This is the variable, that indicates if the User is User or Employee, for determinate the div page. 
  isEmployee: boolean | undefined;

  //This is a variable, to associate all Http response.
  data: any;



  //VARIABLES FOR EMPLOYEE DASHBOARD

  //Variables to which all the created Gifts are associated.
  allGifts: Gift[] = [];

  //Boolean variables to indicate if the Employee want to see all Gifts created.
  showAllGifts = false;

  //Boolean variables to indicate if the Employee want to create a new Gift
  addNewGift = false;

  //Boolean variables to indicate if the Employee want to check all Users.
  showUsers = false;

  //Variable associated with all registered Users who have redeemed at least 1 Reward
  allUsers: any;

  //Boolean variables to indicate if the User has been found.
  userFind: any;

  //Variable to which all the Rewards redeemed by the searched user are associated.
  userFindGift: any;



  //VARIABLES FOR USER 

  //Variable associated with all Rewards redeemed by the logged in User.
  allMyGifts: Gift[] = [];

  //Variable to which the User's Card is associated, if one is in possession.
  myCard: Card | undefined | any;

  //Boolean variables to indicate if the User has a Card.
  hasCard = false;

  //Boolean variables to indicate if the User want to see all Rewards.
  showMyReward = false;

  //Booolean variables to indicate if the User wants to see all Rewards.
  showGiftsForUser = false;



  /**
   * Constructor for this Component. 
   * @param httpClient the HttpClient object.
   * @param userService the UserService for get the User/Employee logged.
   * @param formBuilder the FormBuilder object for the Forms.
   */
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  /**
   * NgOnInit implementation.
   */
  ngOnInit(): void {
    this.initForms();
    this.userType = this.userService.getUser();
    if (this.userType instanceof Employee) {
      this.isEmployee = true;
      this.getAllGifts();
      this.getAllUsers();
    }else if (this.userType instanceof User) {
      this.isEmployee = false;
      this.getAllGifts();
      this.getAllGiftsUser();
      this.getCardUser();
    }
  }


  //-----EMPLOYEE METHODS------

  /**
   * This method allows you to contact the Backend to return  
   * all previously created Rewards.
   */
  getAllGifts() {
    this.httpClient.get<any>(`${environment.baseUrl}/gifts/findAll`).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          this.allGifts = this.data.data;
          console.log("Tutti i Premi : " + this.allGifts);
        } else console.log("error");
      }, err => {
        alert("Something went wrong");
      });
    this.resetData();
    this.resetForm();
  }

  /**
   * This method allows you to contact the Backend to 
   * fetch all Users who have redeemed at least one Reward.
   */
  getAllUsers() {
    this.httpClient.get<any>(`${environment.baseUrl}/gifts/findAllUserReedem`).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          this.allUsers = this.data.data;
        }
      }, err => {
        alert("Something went wrong");
      });
    this.resetData();
    this.resetForm();
  }

  /**
   * This method allows you to contact the Backend to create 
   * a new Reward.
   */
  createGifts() {
    const nomePremio = this.form.value.nome;
    const punti = this.form.value.punti;

    this.httpClient.post(`${environment.baseUrl}/gifts/create`, { nome: nomePremio, punti: punti }).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("Gifts created successfully");
          this.resetData();
          this.resetForm();
          this.addNewGift = false;
          this.getAllGifts();
        }
      }, err => {
        console.log("Error");
      });
    this.resetData();
    this.resetForm();
    this.addNewGift = false;

  }

  /**
   * This method allows you to contact the Backend to remove 
   * a particupar Reward.
   */
  removeGifts(gifts: Gift) {
    this.httpClient.post<any>(`${environment.baseUrl}/gifts/delete/${gifts.id}`, {}).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          alert("Premio rimosso con successo.");
          this.resetData();
          this.resetForm();
        }
      }, err => {
        alert("Error");
      });
    this.resetData();
    this.resetForm();
  }

  /**
   * This method allows you to search for a User who has 
   * redeemed at least one Reward, through his lastname.
   */
  searchUsers() {
    const cognome = this.form.value.cognome;
    for (let user of this.allUsers) {
      if (cognome == user.cognome) {
        this.userFindGift = user;
        this.userFind = true;
        return;
      }
    }
    this.userFind = false;
  }

  /**
   * This method allows you to close and reset the corresponding 
   * values reguarding the User's search form.
   */
  closeSearchUsers() {
    this.showUsers = false;
    this.userFindGift = null;
    this.userFind = false;
    this.resetData();
    this.resetForm();
  }

  /**
   * This method allows you to cancel the creation of a 
   * new Reward.
   */
  undoCreation() {
    this.resetForm();
    this.addNewGift = false;
  }


  //-----USER METHODS------

  /**
   * This method allows you to take all the redeemed 
   * rewards of a given Client.
   */
  getAllGiftsUser() {
    this.httpClient.get<any>(`${environment.baseUrl}/gifts/findAllUser/${this.userType?.getId()}`).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200 || this.data.status == 202) {
          this.allMyGifts = this.data.data;
        }
      }, err => {
        console.log("Something went wrong");
      });
    this.resetData();
    this.resetForm();
  }

  /**
   * This method allows you to take the user's Card 
   * if you have one, to show the points.
   */
  getCardUser() {
    this.httpClient.get<any>(`${environment.baseUrl}/card/findCardUser/${this.userType?.getId()}`).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          this.myCard = this.data.data;
          this.hasCard = true;
        }
      }, err => {
        console.log("Something went wrong");
      });
    this.resetData();
    this.resetForm();
  }

  /**
   * This method allows you to redeem a possible reward, if the points are sufficient.
   * @param gifts the Prize to be redeemed. 
   */
  retreiveGift(gifts: Gift) {
    for (let gift of this.allGifts) {
      if (gift.id == gifts.id) {
        if (gift.punti > this.myCard.punti) {
          alert(`Numero Punti non sufficenti`);
          this.resetData();
          this.resetForm();
        } else {
          this.httpClient.post<any>(`${environment.baseUrl}/gifts/addReward`, { idUser: this.userType?.getId(), idGift: gifts.id }).subscribe(
            response => {
              this.data = response;
              if (this.data.status == 200) {
                alert("Premio riscattato con successo. Ricarica la pagina per vederlo.");
                console.log("Card : " + this.myCard.id + "Punti : " + gifts.punti);
                this.removePoints(this.myCard.id, gifts.punti);
                alert(`${gifts.punti} punti rimossi.`);
              }
            }, err => {
              this.data = err;
              if (this.data.status == 402) {
                alert("Premio già riscattato.");
                this.resetData();
                this.resetForm();
              } else {
                console.log("Something went wrong");
                this.resetData();
                this.resetForm();
              }
            }
          );
        }
        this.resetData();
        this.resetForm();
      }
    }
  }



  //---------GENERAL METHODS---------

  /**
   * This method allows any points to be removed from a Customer's 
   * card when the Customer makes a reward redemption request.
   * @param idCard the Card id of the Customer.
   * @param numberPoints the number of points to be removed.
   */
  removePoints(idCard: Number, numberPoints: Number) {
    this.httpClient.post<any>(`${environment.baseUrl}/card/removePoints/${idCard}`, { punti: numberPoints }).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          this.resetData();
          this.resetForm();
        }
      }, err => {
        alert("Something went wrong");
      }
    );
  }

  /**
 * Method to initialize all fields of the FormGroup.
 */
  initForms() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      punti: ['', Validators.required],
    });
  }

  //This is the method for reset the FormGroup value.
  resetForm() {
    this.form.reset();
  }

  //This is the method for reset the Data from backend.
  resetData() {
    this.data = null;
  }
}
