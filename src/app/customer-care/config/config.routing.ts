/**
 * @author ManhNV
 * @description config routing in CustomerCare
 * @version 1.0.0
 */

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ConfigComponent} from './config.component';
import {BeaconComponent} from './beacon/beacon.component';
import {UnderestimateComponent} from './underestimate/underestimate.component';
import {OfferComponent} from './offer/offer.component';


export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản lý cấu hình'
    },
    component: ConfigComponent,
    children: [
      {
        path: '',
        redirectTo: 'beacon',
        pathMatch: 'full'
      },
      {
        path: 'beacon',
        data: {
          title: 'Beacon'
        },
        component: BeaconComponent
      },
      {
        path: 'underestimate',
        data: {
          title: 'Đánh giá thấp'
        },
        component: UnderestimateComponent
      },
      {
        path: 'offer',
        data: {
          title: 'Tặng điểm & Voucher khi mua hàng'
        },
        component: OfferComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConfigRoutingModule {
}
