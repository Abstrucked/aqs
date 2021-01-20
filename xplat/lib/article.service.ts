import { Injectable } from '@angular/core';
import { BlogArticle, BlogDataService } from '@mxh/web/features/blog/services';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: BlogArticle[] = [];

  constructor(private blogDataService: BlogDataService) { }
  getArticles():BlogArticle[]{
    return this.articles.slice();
  }
  fetchArticles(){


  }
}
