import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BlogDataService } from '@mxh/web/features/blog/services';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogDataResolver implements Resolve<Promise<boolean>> {
  constructor(private blogDataService: BlogDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log('into resolve');

    return new Promise<boolean>(
      (res,rej) => {
        this.blogDataService.fetchArticles().then(
          () => {
            console.log('resolving....');
            res (true);
          }
        ).catch(
          err => {
            console.log('ERROR MXH: ******************', err);
            res (false)
          }
        )
      }
    )
  }
}
