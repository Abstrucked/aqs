import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ArticleEditComponent, ArticleListComponent, AuthComponent, DashboardComponent } from '@mxh/web';

import { SharedModule } from '../shared/shared.module';
import { HOME_COMPONENTS, HomeComponent } from './components';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, children:[
      {
        path: 'index',
        component: LandingPageComponent
      },
      {
        path: '', redirectTo: '/home/index',
        pathMatch: 'full',
      },

    ]
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...HOME_COMPONENTS, LandingPageComponent],
  exports: [...HOME_COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {}
