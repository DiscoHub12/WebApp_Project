import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Employee } from "src/app/Models/employee";
import { User } from "src/app/Models/user";
import { AuthService } from "./auth.service";
  
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  userData!: User | Employee;
  

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
          if(!this.authService.isAuthenticated(this.userData)) {
            if(this.userData instanceof Employee){
              this.router.navigate(['/login-emp']);
            }
            if(this.userData instanceof User){
              this.router.navigate(['/login-user']);
            }
            return false;
          }
          return true;
    }
}

//Il metodo canActivate ritorna true solo quando il percorso può essere navigato.
//In caso di false (l'utente non è autenticato), la navigazione può essere reindirizzata alla home.
