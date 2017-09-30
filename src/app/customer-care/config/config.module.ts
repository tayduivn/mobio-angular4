/**
 * @author TungTo and ManhNV
 * @description config module Config
 * @version 1.0.0
 */

// ====== config module ==========================================================================
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ng2-bootstrap/modal';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {ConfigRoutingModule} from './config.routing';
import {ConfigComponent} from './config.component';
import {UnderestimateService} from '../../common/service/component-service/underestimate.service';
import {SqDatetimepickerModule} from 'ngx-eonasdan-datetimepicker';
import {TooltipModule} from 'ng2-bootstrap';
import {PaginationModule} from '../../common/directive/mobio-pagination/pagination.module';
import {DataFilterType} from '../../common/filter/filter-type.pipe';

// ======= config service ========================================================================
import {ShopService} from '../../common/service/component-service/shop.service';
import {OfferService} from '../../common/service/component-service/offer.service';
import {VoucherService} from '../../common/service/component-service/voucher.service';
import {ToasterModule} from 'angular2-toaster';
import {BeaconService} from '../../common/service/component-service/beacon.service';
import {AccountManagementService} from '../../common/service/component-service/account-management.service';

// ======= config component ========================================================================
import {OfferComponent} from './offer/offer.component';
import {BeaconComponent} from './beacon/beacon.component';
import {UnderestimateComponent} from './underestimate/underestimate.component'

@NgModule({
  imports: [
    CommonModule,
    PaginationModule,
    ModalModule,
    FormsModule,
    AngularMultiSelectModule,
    ConfigRoutingModule,
    SqDatetimepickerModule,
    TooltipModule.forRoot(),
    ToasterModule
  ],
  declarations: [
    DataFilterType,
    BeaconComponent,
    ConfigComponent,
    UnderestimateComponent,
    OfferComponent
  ],
  providers: [
    UnderestimateService,
    OfferService,
    ShopService,
    VoucherService,
    BeaconService,
    AccountManagementService
  ]
})

export class ConfigModule {
}
