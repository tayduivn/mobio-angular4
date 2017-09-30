/**
 * @author ManhNV
 * @description config manager content routing
 * @version 1.0.0
 */

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ContentComponent} from './content.component';
import {ProductComponent} from './product/product.component';
import {ShopComponent} from './shop/shop.component';
import {CardPatternComponent} from './card-pattern/card-pattern.component';
import {MemberCustomerComponent} from './member-customer/member-customer.component';
import {PromotionComponent} from './promotion/promotion.component';
import {UploadAvatarComponent} from './upload-avatar/upload-avatar.component';
import {UploadImagesComponent} from './upload-images/upload-images.component';
import {VoucherComponent} from './voucher/voucher.component';
import {FootTrafficComponent} from './foot-traffic/foot-traffic.component';
import {GiftComponent} from './gift/gift.component';
import {MobileVoucherComponent} from './voucher/mobile/mobile.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản lý nội dung'
    },
    component: ContentComponent,
    children: [
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
      },
      {
        path: 'product',
        data: {
          title: 'Sản phẩm'
        },
        component: ProductComponent
      },
      {
        path: 'shop',
        data: {
          title: 'Cửa hàng'
        },
        component: ShopComponent
      },
      {
        path: 'card-pattern',
        data: {
          title: 'Thẻ mẫu'
        },
        component: CardPatternComponent
      },
      {
        path: 'member-customer',
        data: {
          title: 'Khách hàng thành viên'
        },
        component: MemberCustomerComponent
      },
      {
        path: 'promotion',
        data: {
          title: 'Ưu đãi'
        },
        component: PromotionComponent
      },
      {
        path: 'upload-avatar',
        data: {
          title: 'upAvatar'
        },
        component: UploadAvatarComponent
      },
      {
        path: 'upload-images',
        data: {
          title: 'upImages'
        },
        component: UploadImagesComponent
      },
      {
        path: 'voucher',
        data: {
          title: 'voucher'
        },
        component: VoucherComponent
      },
      {
        path: 'foot-traffic',
        data: {
          title: 'Foot Traffic'
        },
        component: FootTrafficComponent
      },
      {
        path: 'gift',
        data: {
          title: 'Quà tặng'
        },
        component: GiftComponent
      },
      {
        path: 'voucherdemo',
        data: {
          title: 'Quà tặng'
        },
        component: MobileVoucherComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ContentRoutingModule {
}
