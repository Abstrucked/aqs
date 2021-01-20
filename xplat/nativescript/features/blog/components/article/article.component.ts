import { Component } from '@angular/core';

import { BaseComponent } from '@mxh/core';

@Component({
  moduleId: module.id,
  selector: 'pkl-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent extends BaseComponent {
  constructor() {
    super();
  }
}
