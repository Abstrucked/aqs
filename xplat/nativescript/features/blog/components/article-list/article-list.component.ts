import { Component } from '@angular/core';

import { BaseComponent } from '@mxh/core';

@Component({
  moduleId: module.id,
  selector: 'pkl-article-list',
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent extends BaseComponent {
  constructor() {
    super();
  }
}
