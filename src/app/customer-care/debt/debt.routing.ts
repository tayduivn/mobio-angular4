/**
 * @author ManhNV
 * @description config routing in CustomerCare
 * @version 1.0.0
 */

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DebtComponent} from './debt.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: {
      title: 'Đối soát công nợ'
    },
    component: DebtComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DebtRoutingModule {
}
