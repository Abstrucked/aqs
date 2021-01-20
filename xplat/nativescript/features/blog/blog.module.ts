import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BlogModule as SharedBlogModule } from '@mxh/features';
import { UIModule } from '../ui/ui.module';
import { BLOG_COMPONENTS } from './components';

@NgModule({
  imports: [SharedBlogModule, UIModule],
  declarations: [...BLOG_COMPONENTS],
  exports: [...BLOG_COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BlogModule {}
