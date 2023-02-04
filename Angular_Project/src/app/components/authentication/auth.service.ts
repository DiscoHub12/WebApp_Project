/**import { Employee } from "src/app/Models/employee";
import { User } from "src/app/Models/user";

export class AuthService {
    [x: string]: any;
    private userData: User | Employee | undefined;
  
    setUserData(data: User | Employee) {
      this.userData = data;
    }
  
    getUserData() {
      return this.userData;
    }

    //Controlla se il token è scaduto e restituisce true o false
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
}

*/