import { NgModule } from '@angular/core';

// xplat
import { UIModule } from '@mxh/nativescript';

const MODULES = [UIModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES]
})
export class SharedModule {}
