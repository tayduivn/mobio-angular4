/**
 * @author ManhNV
 * @description config routing in dashboard
 * @version 1.0.0
 */

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bảng điều khiển'
    },
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule {
}
