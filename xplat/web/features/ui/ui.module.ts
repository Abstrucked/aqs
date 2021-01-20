import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// libs
import { UISharedModule } from '@mxh/features';
import { UI_COMPONENTS } from './components';

import { UI_DIRECTIVES } from './directives';

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  UISharedModule,
];

@NgModule({
  imports: [...MODULES],
  declarations: [...UI_COMPONENTS, ...UI_DIRECTIVES],
  exports: [...MODULES, ...UI_COMPONENTS, ...UI_DIRECTIVES],
})
export class UIModule {}
