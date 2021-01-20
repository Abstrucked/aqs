import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseComponent } from '@mxh/core';
import { BlogArticle, BlogDataService } from '../../services';

@Component({
  selector: 'pkl-article',
  templateUrl: 'article.component.html',
})
export class ArticleComponent extends BaseComponent {
  @Input() article:BlogArticle;
  constructor(private blogService: BlogDataService, private route:ActivatedRoute, private router: Router) {
    super();
  }
  openArticle(){
    this.blogService.clickedArticle.next(this.article);
    this.router.navigate([this.article.id], {relativeTo: this.route})
1  }
}
