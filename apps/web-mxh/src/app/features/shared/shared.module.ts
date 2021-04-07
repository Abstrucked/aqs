import { NgModule } from '@angular/core';

// xplat
import { UIModule } from '@mxh/web';
import { ChiSiamoComponent } from '../chi-siamo/chi-siamo.component';
import { ProgettiComponent } from '../progetti/progetti.component';
import { SupportComponent } from '../support/support.component';

const MODULES = [UIModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
  declarations: [ChiSiamoComponent, ProgettiComponent, SupportComponent],
})
export class SharedModule {}
