import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BaseComponent } from '@mxh/core';
import { User } from '@mxh/core/models/user.model';
import { AuthService } from '@mxh/web/features/auth/services';
import { BlogArticle, BlogDataService } from '@mxh/web/features/blog/services';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'pkl-dashboard',
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent extends BaseComponent implements OnInit, OnDestroy{
  user: User;
  userSub: Subscription;
  articles: BlogArticle[] = [];
  constructor(
      private authService: AuthService,
      private route:ActivatedRoute,
      private router: Router,
      private blogService:BlogDataService) {
    super();
  }
  ngOnInit(){
   this.userSub = this.authService.loggedUser.subscribe(
     (user:User) => {
       if(user){
        this.user = user;
        this.blogService.fetchArticlesByUser(this.authService.loggedUser.value.uid).then(
          () => {
            this.articles = this.blogService.articleList.value;
          }
        );
       }else{
        // this.router.navigate(['/auth'])
       }

     }
   )
  }

  onGoToArticles(){
      this.router.navigate(['articles'])
  }
  ngOnDestroy() {
    if(this.userSub){
      this.userSub .unsubscribe();
    }
  }
}
