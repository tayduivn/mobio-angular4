import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerInsightComponent} from './customer-insight.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Phân tích khách hàng'
    },
    component: CustomerInsightComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerInsightRoutingModule {
}
