import { Component } from '@angular/core';

import { BaseComponent } from '@mxh/core';

@Component({
  moduleId: module.id,
  selector: 'pkl-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends BaseComponent {
  constructor() {
    super();
  }
}
