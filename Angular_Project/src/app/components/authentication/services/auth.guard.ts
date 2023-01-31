import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth.service";
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
          if(!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
    }
}

//Il metodo canActivate ritorna true solo quando il percorso può essere navigato.
//In caso di false (l'utente non è autenticato), la navigazione può essere reindirizzata alla pagina di login.