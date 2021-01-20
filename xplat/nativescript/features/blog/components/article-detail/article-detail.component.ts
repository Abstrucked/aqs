import { Component } from '@angular/core';

import { BaseComponent } from '@mxh/core';

@Component({
  moduleId: module.id,
  selector: 'pkl-article-detail',
  templateUrl: './article-detail.component.html',
})
export class ArticleDetailComponent extends BaseComponent {
  constructor() {
    super();
  }
}
