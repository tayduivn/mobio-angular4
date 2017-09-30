import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationDirectiveComponent} from './pagination.directive';

@NgModule({
  imports: [CommonModule], // import module support pagination module
  declarations: [PaginationDirectiveComponent],
  exports: [PaginationDirectiveComponent]
})
export class PaginationModule {
}
