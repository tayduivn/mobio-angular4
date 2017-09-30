/**
 * @author ManhNV
 * @description config module CustomerCare
 * @version 1.0.0
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ng2-bootstrap/modal';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {IonRangeSliderModule} from 'ng2-ion-range-slider';
import {BsDropdownModule} from 'ng2-bootstrap/dropdown';
import {Daterangepicker} from 'ng2-daterangepicker';

import {DebtComponent} from './debt.component';

import {DebtService} from '../../common/service/component-service/debt.service';
import {DebtRoutingModule} from './debt.routing';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    FormsModule,
    AngularMultiSelectModule,
    IonRangeSliderModule,
    DebtRoutingModule,
    Daterangepicker,
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    DebtComponent
  ],
  providers: [
    DebtService
  ]
})

export class DebtModule {
}
