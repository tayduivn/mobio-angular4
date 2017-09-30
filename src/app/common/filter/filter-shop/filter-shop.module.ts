import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataFilterShop} from './filter-shop.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [DataFilterShop],
  exports: [DataFilterShop]
})
export class DataFilterShopModule {
}
