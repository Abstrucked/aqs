import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BlogArticle, BlogDataService } from '@mxh/web/features/blog/services';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogArticleResolver implements Resolve<Promise<BlogArticle> | Observable<BlogArticle> | BlogArticle> {
  constructor(private blogDataService: BlogDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<BlogArticle> | Observable<BlogArticle> | BlogArticle {
    console.log('into resolve single article');
    if(this.blogDataService.clickedArticle.value !== null){
      return this.blogDataService.clickedArticle.value
    }else{
      this.blogDataService.fetchArticleById(route.queryParams.id).then(
        article => {
          console.log('fetchjing.......');

          return article
        }
      ).catch(
        err => {
          console.log(err);

        }
      )
    }
    return null;
  }
}
