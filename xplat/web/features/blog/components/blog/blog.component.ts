import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogBaseComponent } from '@mxh/features';
import { Subscription } from 'rxjs';
import { BlogArticle, BlogDataService } from '../../services';

@Component({
  selector: 'pkl-blog',
  templateUrl: 'blog.component.html',
})
export class BlogComponent extends BlogBaseComponent implements OnInit, OnDestroy{
  blogSub: Subscription;
  categories: string []=[];
  filteredArticles: BlogArticle[] = [];
  constructor(
    private blogService: BlogDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }
  ngOnInit() {
    this.categories = this.blogService.categoryList.value;
    // console.log(this.categories);

    this.blogSub = this.blogService.clickedArticle.subscribe(
      article => {
        if(article){
          // console.log(article, 'CLICKED')
          this.router.navigate(['article',article.id],{relativeTo:this.route})
        }
      }
    )
  }
  filterCategory(category: string) {
    this.router.navigate(['/blog'])
    this.blogService.fetchArticles().then(
      () => {
    let articlesToFilter = this.blogService.articleList.value.slice();
    articlesToFilter.forEach(
      article => {
        if(article.category === category){
          this.filteredArticles.push(article)
        }
      }
    )

        this.blogService.articleList.next(this.filteredArticles);
    this.filteredArticles = [];
    }
    )

  }
  ngOnDestroy() {
    if(this.blogSub){
      this.blogSub.unsubscribe();3
    }
  }
}
