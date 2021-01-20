import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule as SharedAuthModule } from '@mxh/features';
import { UIModule } from '../ui/ui.module';
import { AUTH_COMPONENTS, AuthComponent } from './components';


export const routes: Routes = [
  {
    path: '', component: AuthComponent
  }
];
@NgModule({
  imports: [SharedAuthModule, UIModule, RouterModule.forChild(routes)],
  declarations: [...AUTH_COMPONENTS],
  exports: [...AUTH_COMPONENTS],
})
export class AuthModule {}
