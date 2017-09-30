/**
 * @author ManhNV
 * @description config routing in CustomerCare
 * @version 1.0.0
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCareComponent } from './customer-care.component';
import { ReservationComponent } from './reservation/reservation.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Chăm sóc khách hàng'
    },
    component: CustomerCareComponent,
    children: [
      {
        path: '',
        redirectTo: 'content',
        pathMatch: 'full'
      },
      {
        path: 'content',
        loadChildren: './content/content.module#ContentModule'
      },
      {
        path: 'debt',
        loadChildren: './debt/debt.module#DebtModule'
      }, {
        path: 'config',
        loadChildren: './config/config.module#ConfigModule'
      }, {
        path: 'report',
        loadChildren: './report/report.module#ReportModule'
      }, {
        path: 'comment',
        loadChildren: './comment/comment.module#CommentModule'
      }, {
        path: 'reservations',
        component: ReservationComponent
      },
      {
        path: 'transaction',
        loadChildren: './transaction/transaction.module#TransactionModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerCareRoutingModule {
}
