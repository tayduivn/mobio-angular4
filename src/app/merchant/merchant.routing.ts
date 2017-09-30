/**
 * @author ManhNV
 * @description config routing in merchant
 * @version 1.0.0
 */

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// load component
import {MerchantComponent} from './merchant.component';
import {MerchantInfoComponent} from './merchant-info/merchant-info.component';
import {AccountInfoComponent} from './account-info/account-info.component';
import {AccountManagementComponent} from './account-management/account-management.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tài Khoản'
    },
    component: MerchantComponent,
    children: [
      {
        path: '',
        redirectTo: 'merchant-info',
        pathMatch: 'full'
      },
      {
        path: 'merchant-info',
        data: {
          title: 'Thông tin nhãn hàng'
        },
        component: MerchantInfoComponent
      },
      {
        path: 'account-info',
        data: {
          title: 'Thông tin tài khoản'
        },
        component: AccountInfoComponent
      },
      {
        path: 'account-management',
        data: {
          title: 'Phân quyền tài khoản'
        },
        component: AccountManagementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MerchantRoutingModule {
}
