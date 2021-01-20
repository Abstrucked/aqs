import { Directive } from '@angular/core';
import { BaseComponent } from '@mxh/core';

@Directive()
export abstract class BlogBaseComponent extends BaseComponent {
  public text: string = 'Blog';

  constructor() {
    super();
  }
}
