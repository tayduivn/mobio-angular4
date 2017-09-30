/**
 * @author ManhNV
 * @description config module manager content
 * @version 1.0.0
 */

// ========================== MODULE SUPPORT THIRD PARTY =====================================================
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angular2-qrcode';
import { CommonModule } from '@angular/common';
import { ToasterModule } from 'angular2-toaster';
import { ModalModule, CarouselModule, TooltipModule } from 'ng2-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda'; // using loading button
import { HttpModule } from '@angular/http';
import { CKEditorModule } from 'ng2-ckeditor';
import { TagInputModule } from 'ngx-chips';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap';
import { PopoverModule } from 'ngx-popover';
import { AgmCoreModule } from '@agm/core'
import { DragulaModule } from 'ng2-dragula';
import { OverlayModule } from 'angular-io-overlay';
import { PaginationModule } from '../../common/directive/mobio-pagination/pagination.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { FileUploadModule } from 'ng2-file-upload';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

// =========================== FILTER PIPE ==================================================================
import { DataFilterPipe } from './product/product-filter/filter-allow-change.pipe';
import { FilterCategory } from './product/product-filter/filter-category.pipe';
import { DataFilterAllowShow } from './product/product-filter/filter-allow-show.pipe';
import { DataFilterArrayCity } from './shop/filter-array-city.pipe';
import { DataFilterCity } from '../../common/filter/filter-city.pipe';
import { MapCityPipe } from '../../common/filter/map-city.pipe';
import { ContentRoutingModule } from './content.routing';
import { DataFilterShopModule } from '../../common/filter/filter-shop/filter-shop.module';

// =========================== CONTROL COMPONENT ============================================================
import { ContentComponent } from './content.component';
import { ProductComponent } from './product/product.component';
import { ShopComponent } from './shop/shop.component';
import { CardPatternComponent } from './card-pattern/card-pattern.component';
import { MemberCustomerComponent } from './member-customer/member-customer.component';
import { PromotionComponent } from './promotion/promotion.component';
import { VoucherComponent } from './voucher/voucher.component';
import { FootTrafficComponent } from './foot-traffic/foot-traffic.component';
import { GiftComponent } from './gift/gift.component';

// =========================== DIRECTIVE COMPONENT ==========================================================
// directive mobile component
import { MobileVoucherComponent } from './voucher/mobile/mobile.component';
import { MobileProductComponent } from './product/mobile/product/mobile-product.component';
import { MobileKaraokeComponent } from './product/mobile/karaoke/mobile-karaoke.component';
import { MobilePromotionComponent } from './promotion/mobile/mobile.component';
import { MobileGiftComponent } from './gift/mobile/mobile.component';
import { MobileFootTrafficComponent } from './foot-traffic/mobile/mobile.component';
// directive upload component

import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { DucDatetimepickerModule } from '../../components/duc-datetimepicker/duc-datetimepicker.module';

// =========================== PROVIDER ======================================================================
import { ProductService } from '../../common/service/component-service/product.service';
import { CategoryService } from '../../common/service/common-service/category.service';
import { UtilService } from '../../common/service/common-service/util.service';
import { PromotionService } from '../../common/service/component-service/promotion.service';
import { ShopService } from '../../common/service/component-service/shop.service';
import { ProvincesService } from '../../common/service/common-service/provinces.service';
import { AccountManagementService } from '../../common/service/component-service/account-management.service';
import { CardPatternService } from '../../common/service/component-service/card-pattern.service';
import { MemberCustomerService } from '../../common/service/component-service/member-customer.service';
import { VoucherService } from '../../common/service/component-service/voucher.service';
import { FootTrafficService } from '../../common/service/component-service/foot-traffic.service';
import { GiftService } from '../../common/service/component-service/gift.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { ApiRequestService } from '../../common/service/common-service/api-request.service';


@NgModule({
  imports: [
    CommonModule,
    ButtonsModule.forRoot(),
    PaginationModule,
    DucDatetimepickerModule,
    DataFilterShopModule,
    ModalModule,
    QRCodeModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    FormsModule,
    LaddaModule,
    ReactiveFormsModule,
    OverlayModule,
    HttpModule,
    CKEditorModule,
    ToasterModule,
    DataTableModule,
    TagInputModule,
    PopoverModule,
    AngularMultiSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyALlHESt8QEsvJq6ffXbC4T9JhBjMTiXm8'
    }),
    ContentRoutingModule,
    DragulaModule,
    BsDropdownModule.forRoot(),
    FileUploadModule,
    IonRangeSliderModule,
    Daterangepicker,
    NKDatetimeModule
  ],
  declarations: [
    ContentComponent,
    ProductComponent,
    DataFilterPipe,
    DataFilterArrayCity,
    DataFilterCity,
    MapCityPipe,
    MobileProductComponent,
    MobileKaraokeComponent,
    MobilePromotionComponent,
    MobileVoucherComponent,
    MobileGiftComponent,
    MobileFootTrafficComponent,
    DataFilterAllowShow,
    FilterCategory,
    CardPatternComponent,
    ShopComponent,
    MemberCustomerComponent,
    PromotionComponent,
    UploadAvatarComponent,
    UploadImagesComponent,
    VoucherComponent,
    FootTrafficComponent,
    GiftComponent
  ],
  providers: [
    ProductService,
    CategoryService,
    UtilService,
    PromotionService,
    ShopService,
    ProvincesService,
    AccountManagementService,
    CardPatternService,
    MemberCustomerService,
    VoucherService,
    FootTrafficService,
    GiftService,
    ApiRequestService
  ]
})

export class ContentModule {
}
