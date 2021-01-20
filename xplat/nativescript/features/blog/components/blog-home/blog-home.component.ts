import { Component } from '@angular/core';

import { BaseComponent } from '@mxh/core';

@Component({
  moduleId: module.id,
  selector: 'pkl-blog-home',
  templateUrl: './blog-home.component.html',
})
export class BlogHomeComponent extends BaseComponent {
  constructor() {
    super();
  }
}
