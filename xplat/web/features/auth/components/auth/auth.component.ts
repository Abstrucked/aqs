import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@mxh/core/models/user.model';

import { AuthBaseComponent } from '@mxh/features';
import { AuthService } from '@mxh/web/features/auth/services';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'pkl-auth',
  templateUrl: 'auth.component.html',
})
export class AuthComponent extends AuthBaseComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  loginObs: Subscription;
  constructor(private authService: AuthService, private router: Router, private activeRoute: ActivatedRoute) {
    super(authService);
  }
  onSubmit ( authForm: NgForm ){
    const email = authForm.controls['email'].value;
    const passw = authForm.controls['password'].value;
    authForm.reset();
    console.log(email, passw);

    switch (this.mode){
      case 0: {
       this.authService.onLogin(email, passw).then(
          x => {
            let user = this.authService.loggedUser.value;
            let t = user.kind
            this.text = t === 0 ? 'common' : 'admin';
            this.router.navigate(['/dash',user.uid],{relativeTo: this.activeRoute})
          }
         );
        this.isAuthenticated = true;
      } break;
      case 1: {
        this.loginObs = this.authService.onSignup(email, passw).subscribe();
        this.isAuthenticated = true;
      } break;
    }
  };
  ngOnInit(){

  }
  ngOnDestroy() {
    if(this.loginObs){
      this.loginObs.unsubscribe();
    }
  }
}
