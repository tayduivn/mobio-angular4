import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DucDatetimepickerComponent } from './duc-datetimepicker.component';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  imports: [CommonModule, TextMaskModule], // import module support pagination module
  declarations: [DucDatetimepickerComponent],
  exports: [DucDatetimepickerComponent]
})
export class DucDatetimepickerModule {
}
