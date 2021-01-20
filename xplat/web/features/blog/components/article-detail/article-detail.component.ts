import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BaseComponent } from '@mxh/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogArticle, BlogDataService } from '../../services';

@Component({
  selector: 'pkl-article-detail',
  templateUrl: 'article-detail.component.html',
})
export class ArticleDetailComponent extends BaseComponent implements OnInit, OnDestroy{
  constructor(private blogService: BlogDataService, private route: ActivatedRoute) {
    super();
  }
  article: BlogArticle;
  articleId: string = '';
  articleSub: Subscription;
  id: string = '';
  paramSub: Subscription;
  ngOnInit() {
   this.paramSub = this.route.params.subscribe(par => {
      console.log (par.id);
      this.id = par.id;
    })
    this.articleSub = this.blogService.clickedArticle.subscribe(
      selectedArt => {
        if(selectedArt !== null){
          this.article = selectedArt
        }else{
          this.blogService.fetchArticleById(this.id).then(
            art => {

              this.article = art;
              this.blogService.clickedArticle.next(art)
            }
          ).catch(err => { console.log('*********ERROR************', err);
          })
        }
      }
    )






  }
  ngOnDestroy() {
    if(this.articleSub){
      this.articleSub.unsubscribe();

    }
    if(this.paramSub){
      this.paramSub.unsubscribe();
    }
    this.blogService.clickedArticle.next(null);
  }
}
