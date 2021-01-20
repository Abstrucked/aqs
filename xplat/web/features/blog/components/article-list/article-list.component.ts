import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from '@mxh/core';
import { BlogArticle, BlogDataService } from '@mxh/web/features/blog/services';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'pkl-article-list',
  templateUrl: 'article-list.component.html',
})
export class ArticleListComponent extends BaseComponent implements OnInit, OnDestroy {
  articles: BlogArticle[];
  articlesSub: Subscription;

  userMode: boolean;
  user: string;
  constructor(private blogService:BlogDataService,
    private route: ActivatedRoute) {
    super();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.articles = this.blogService.articleList.value;
    this.articlesSub = this.blogService.articleList.subscribe(
      articles => {
        this.articles = articles;
      }
    );
    this.route.queryParams.subscribe(
      params => {
        console.log(params.user);
        this.userMode = params.user? true : false;
        this.user = params.user;
      }
    )
  }
  goToArticle(){

  }
  onDelete(id: string) {
    this.blogService.deleteArticle(id);
    this.blogService.fetchArticlesByUser(this.user).then(
      () => {
        console.log('The updated list has been fetch!');

      }
    )
  }
  ngOnDestroy() {
    if(this.articlesSub){
      this.articlesSub.unsubscribe();
    }
  }
}
