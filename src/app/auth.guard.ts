import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    /*const allowedRoles = route.data?.['allowedRoles'] as Array<string>; // récupérer les rôles autorisés pour cette route
     // a changer la manière de get le role après
    if (this.loginService.isLoggedIn && allowedRoles.includes(localStorage.getItem('role')|| 'admin')) { // vérifier si l'utilisateur actuel a le rôle approprié
      return true; 
    }
    
    this.router.navigate(['/dashboard']);
    return false;*/
    return true;
  }
  
}
