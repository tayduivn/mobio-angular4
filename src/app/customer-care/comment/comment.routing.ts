import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommentComponent} from './comment.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản lý comment'
    },
    component: CommentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CommentRoutingModule {
}
