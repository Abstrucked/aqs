import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogModule as SharedBlogModule } from '@mxh/features';
import { BlogDataResolver } from 'xplat/lib/blog-data.resolver';
import { BlogArticleResolver } from 'xplat/lib/blog-article.resolver';
import { UIModule } from '../ui/ui.module';
import { ArticleDetailComponent, ArticleEditComponent, BlogComponent, BlogHomeComponent, BLOG_COMPONENTS } from './components';

export const blogRoutes: Routes = [
  {
    path: '', component:BlogComponent, resolve: [BlogDataResolver], children: [
      {
        path: '', component:BlogHomeComponent
      },
      {
        path: ':id', component:ArticleDetailComponent, resolve: [BlogArticleResolver]
      },

    ]
  },

]

@NgModule({
  imports: [SharedBlogModule, UIModule, RouterModule.forChild(blogRoutes)],
  declarations: [...BLOG_COMPONENTS],
  exports: [...BLOG_COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BlogModule {}
