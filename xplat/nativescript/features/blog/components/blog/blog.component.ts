import { Component } from '@angular/core';

import { BlogBaseComponent } from '@mxh/features';

@Component({
  moduleId: module.id,
  selector: 'pkl-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent extends BlogBaseComponent {
  constructor() {
    super();
  }
}
