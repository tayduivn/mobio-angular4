/**
 * @author TungTo
 * @description config routing in CustomerCare
 * @version 1.0.0
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { FootTrafficReportComponent } from './foot-traffic/foot-traffic-report.component';
import { GiftReportComponent } from './gift/gift-report.component';
import { PromotionReportComponent } from './promotion/promotion-report.component';
import { RateComponent } from './rate/rate.component';
import { ProductReportComponent } from './product-report/product-report.component';
import { VoucherReportComponent } from './voucher/voucher-report.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Báo cáo thống kê'
    },
    component: ReportComponent,
    children: [
      {
        path: '',
        redirectTo: 'foot-traffic',
        pathMatch: 'full'
      },
      {
        path: 'foot-traffic',
        data: {
          title: 'Foot-traffic'
        },
        component: FootTrafficReportComponent
      },
      {
        path: 'gift',
        data: {
          title: 'Quà tặng'
        },
        component: GiftReportComponent
      },
      {
        path: 'promotion',
        data: {
          title: 'Ưu đãi'
        },
        component: PromotionReportComponent
      },
      {
        path: 'rate',
        data: {
          title: 'Lịch sử khách hàng đánh giá'
        },
        component: RateComponent
      },
      {
        path: 'product',
        data: {
          title: 'Sản phẩm'
        },
        component: ProductReportComponent
      },
      {
        path: 'voucher',
        data: {
          title: 'Voucher'
        },
        component: VoucherReportComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReportRoutingModule {
}
