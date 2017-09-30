/**
 * @author ManhNV
 * @description config module merchant
 * @version 1.0.0
 */

// ========================== MODULE SUPPORT THIRD PARTY =====================================================
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LaddaModule} from 'angular2-ladda';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {CKEditorModule} from 'ng2-ckeditor';
import {ModalModule, TooltipModule} from 'ng2-bootstrap';
import {DataTableModule} from 'angular2-datatable';
import {TagInputModule} from 'ngx-chips';
import {BsDropdownModule} from 'ng2-bootstrap/dropdown';
import {PopoverModule} from 'ngx-popover';
import {MerchantRoutingModule} from './merchant.routing';
import {PaginationModule} from '../common/directive/mobio-pagination/pagination.module';

// =========================== FILTER PIPE ==================================================================
import {DataFilterShopModule} from '../common/filter/filter-shop/filter-shop.module';
import {RolePipe} from '../common/filter/role.pipe';

// =========================== CONTROL COMPONENT ============================================================
import {MerchantComponent} from './merchant.component';
import {MerchantInfoComponent} from './merchant-info/merchant-info.component';
import {AccountInfoComponent} from './account-info/account-info.component';
import {AccountManagementComponent} from './account-management/account-management.component';

// =========================== DIRECTIVE COMPONENT ==========================================================

// =========================== PROVIDER ======================================================================
import {UtilService} from '../common/service/common-service/util.service';
import {CategoryService} from '../common/service/common-service/category.service';
import {AccountManagementService} from '../common/service/component-service/account-management.service';
import {AccountInfoService} from '../common/service/component-service/account-info.service';
import {ShopService} from 'app/common/service/component-service/shop.service';
import {ProvincesService} from '../common/service/common-service/provinces.service';
import {MerchantInfoService} from '../common/service/component-service/merchant-info.service';
import {RoleService} from '../common/service/common-service/role.service';

@NgModule({
  imports: [
    DataFilterShopModule,
    CommonModule,
    ToasterModule,
    ModalModule,
    FormsModule,
    ModalModule,
    LaddaModule,
    MerchantRoutingModule,
    TooltipModule.forRoot(),
    DataTableModule,
    ReactiveFormsModule,
    HttpModule,
    CKEditorModule,
    TagInputModule,
    BsDropdownModule,
    PopoverModule,
    MerchantRoutingModule,
    PaginationModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    RolePipe,
    MerchantComponent,
    MerchantInfoComponent,
    AccountInfoComponent,
    AccountManagementComponent
  ],
  providers: [
    UtilService,
    AccountInfoService,
    ShopService,
    CategoryService,
    AccountManagementService,
    ProvincesService,
    MerchantInfoService,
    RoleService
  ]
})

export class MerchantModule {
}
