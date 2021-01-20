import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@mxh/web/features/auth/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService, private router:Router)  {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let loggedIn = false
    this.authService.loggedUser.subscribe(
      user => {
        if(user && user.uid === route.params.id){
          loggedIn = true
        }else{
          this.router.navigate(['auth'])
        }
      }
    )
    return loggedIn;
  }

}
