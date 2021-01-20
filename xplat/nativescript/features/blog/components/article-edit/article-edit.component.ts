import { Component } from '@angular/core';

import { BaseComponent } from '@mxh/core';

@Component({
  moduleId: module.id,
  selector: 'pkl-article-edit',
  templateUrl: './article-edit.component.html',
})
export class ArticleEditComponent extends BaseComponent {
  constructor() {
    super();
  }
}
