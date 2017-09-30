/**
 * @author ManhNV
 * @description config module CustomerCare
 * @version 1.0.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule, TooltipModule } from 'ng2-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { TextMaskModule } from 'angular2-text-mask';
import { Daterangepicker } from 'ng2-daterangepicker';
import { ToasterModule } from 'angular2-toaster';

import { PaginationModule } from '../common/directive/mobio-pagination/pagination.module';

import { CustomerCareRoutingModule } from './customer-care.routing';
import { CustomerCareComponent } from './customer-care.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationService } from '../common/service/component-service/reservation.service';
import { DucDatetimepickerModule } from '../components/duc-datetimepicker/duc-datetimepicker.module';
import { ShopService } from '../common/service/component-service/shop.service';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    TooltipModule.forRoot(),
    ToasterModule,
    DucDatetimepickerModule,
    FormsModule,
    CustomerCareRoutingModule,
    AngularMultiSelectModule,
    IonRangeSliderModule,
    PaginationModule,
    Daterangepicker,
    BsDropdownModule.forRoot(),
    TextMaskModule,
  ],
  declarations: [
    CustomerCareComponent,
    ReservationComponent
  ],
  providers: [
    ReservationService,
    ShopService
  ]
})

export class CustomerCareModule {
}
