import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@mxh/core/models/user.model';

import { HeaderBaseComponent } from '@mxh/features';
import { AuthService } from '@mxh/web/features/auth/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pkl-header',
  templateUrl: 'header.component.html',
  styleUrls:['header.component.css']
})
export class HeaderComponent extends HeaderBaseComponent implements OnInit, OnDestroy{
  //isDropdownShown = false;
  isAuthenticated = false;
  userSub: Subscription;
  user: User;
  constructor(private authService:AuthService, private router: Router, private route: ActivatedRoute) {
    super()
  }
  ngOnInit() {
    this.authService.loggedUser.subscribe(
      user => {
        if(user){
          this.user= user;

          // console.log('USerLogged');
          this.isAuthenticated = true;

        }else{
          // console.log('AnonymusUser');
          this.isAuthenticated = false;
        }
      }
    );
  }
  goToDashboard() {
    this.router.navigate(['/dash',this.user.uid])
  }
  onLogButton(){
    if(this.isAuthenticated){
      this.logout();
    }else{
      this.login();
    }
  }
  login() {
    this.router.navigate(['auth'],{relativeTo: this.route});
  }
  logout() {
    // console.log('logging out.....');
    this.user = null;
    this.authService.loggedUser.next(null);
    this.router.navigate(['/home']);

   }
  onSaveData() { }
  onFetchData() { }
  ngOnDestroy() {
    if(this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
