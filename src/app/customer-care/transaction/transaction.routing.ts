/**
 * @author SonHK
 * @description config routing in Manager customer trade
 * @version 1.0.0
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction.component';
import { PointComponent } from './point/point.component';
import { EarnPointComponent } from './earn-point/earn-point.component';
import { VoucherComponent } from './voucher/voucher.component';
import { SwapComponent } from './swap/swap.component';
import{CustomerHistoryComponent} from './customer-history/customer-history.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản lý giao dịch khách hàng'
    },
    component: TransactionComponent,

    children: [
      {
        path: 'offer',
        redirectTo: 'voucher',
        pathMatch: 'full'
      },
      {
        path: 'point',
        data: {
          title: 'Tích điểm bằng file'
        },
        component: PointComponent
      },
      {
        path: 'earn-point',
        data: {
          title: "Tích điểm mua hàng bằng file"
        },
        component: EarnPointComponent
      }, {
        path: 'voucher',
        data: {
          title: 'Tặng điểm/ Voucher'
        },
        component: VoucherComponent
      }, {
        path: 'swap',
        data: {
          title: 'Đổi quà/ Voucher'
        },
        component: SwapComponent
      },{
        path: 'customer-history',
        data:{
          title: 'Lịch sử giao dịch KH'
        },
        component: CustomerHistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TransactionRouting {
}
