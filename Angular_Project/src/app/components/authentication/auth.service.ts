import { Employee } from "src/app/Models/employee";
import { User } from "src/app/Models/user";

export class AuthService {
    private userData: User | Employee | undefined;
  
    setUserData(data: User | Employee) {
      this.userData = data;
    }
  
    getUserData() {
      return this.userData;
    }
}