import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleEditComponent, ArticleListComponent, AuthComponent, DashboardComponent } from '@mxh/web';

import { SharedModule } from '../shared/shared.module';
import { HOME_COMPONENTS, HomeComponent } from './components';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, children:[

      {
        path: '', redirectTo: '',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...HOME_COMPONENTS],
  exports: [...HOME_COMPONENTS],
})
export class HomeModule {}
