import {Injectable, NgModule, Pipe, PipeTransform} from '@angular/core';
import {CommonModule} from '@angular/common';

@Pipe({
  name: 'dataFilterShop'
})
@Injectable()
export class DataFilterShop implements PipeTransform {

  transform(array: any[], queryAddressShop: string): any {
    if (queryAddressShop && queryAddressShop !== '') {
      return array.filter(item => item.address.indexOf(queryAddressShop) !== -1);
    }
    return array;
  }
}
