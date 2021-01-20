import { Directive } from '@angular/core';

// libs
import { BaseComponent } from '@mxh/core';
import { AppService } from '@mxh/nativescript/core';

@Directive()
export abstract class AppBaseComponent extends BaseComponent {
  constructor(protected appService: AppService) {
    super();
  }
}
