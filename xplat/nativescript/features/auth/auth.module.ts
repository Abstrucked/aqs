import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthModule as SharedAuthModule } from '@mxh/features';
import { UIModule } from '../ui/ui.module';
import { AUTH_COMPONENTS } from './components';

@NgModule({
  imports: [SharedAuthModule, UIModule],
  declarations: [...AUTH_COMPONENTS],
  exports: [...AUTH_COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule {}
