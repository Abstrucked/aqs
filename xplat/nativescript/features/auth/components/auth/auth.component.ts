import { Component } from '@angular/core';

import { AuthBaseComponent } from '@mxh/features';

@Component({
  moduleId: module.id,
  selector: 'pkl-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent extends AuthBaseComponent {
  constructor() {
    super();
  }
}
