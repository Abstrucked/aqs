// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent, ArticleEditComponent, ArticleListComponent, DashboardComponent } from '@mxh/web';
import { AuthComponent } from '@mxh/web/features/auth';

// app
import { SharedModule } from './features/shared/shared.module';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate, loggedIn } from '@angular/fire/auth-guard';
import { AuthGuard } from './auth.guard';
import { BlogArticle } from '@mxh/web/features/blog/services';
import { ChiSiamoComponent } from './features/chi-siamo/chi-siamo.component';
import { ProgettiComponent } from './features/progetti/progetti.component';
import { SupportComponent } from './features/support/support.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/index',
    pathMatch: 'full',
  },
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: 'blog',
    loadChildren: () => import('@mxh/web/features/blog/blog.module').then((m) => m.BlogModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'chi-siamo',
    component: ChiSiamoComponent
  },
  {
    path: 'progetti',
    component: ProgettiComponent
  },
  {
    path: 'support',
    component: SupportComponent
  },
  {
    path: 'dash/:id',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: 'articles', component:ArticleListComponent, data: { userMode: true }
      },
      {
        path: 'articles/new', component:ArticleEditComponent
      },
      {
        path: 'articles/edit', component:ArticleEditComponent
      },
      {
        path: 'articles/:article', component:ArticleDetailComponent
      }
    ]

  }
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('@mxh/web/features/auth/auth.module').then((m) => m.AuthModule),
  // },
];

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
